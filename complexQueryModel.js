const { sql, poolPromise } = require('../config/database');

class ComplexQueryModel {
    // Add this new method to your existing ComplexQueryModel class

    static async getBusinessDetailsById(businessId) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('BusinessID', sql.Int, businessId)
                .query(`
                SELECT 
                    bp.BusinessID,
                    bp.BusinessName,
                    bp.ContactPerson,
                    bp.InActive,
                    
                    -- Address Information
                    a.AddressID,
                    a.Street,
                    a.StreetNo,
                    a.City,
                    a.State,
                    a.ZIPCode,
                    a.County,
                    
                    -- Email Information
                    e.EmailID,
                    e.EmailAddress,
                    et.EmailTypeID,
                    et.Description as EmailType,
                    
                    -- Phone Information
                    p.PhoneID,
                    p.PhoneNumber,
                    pt.PhoneTypeID,
                    pt.Description as PhoneType
                FROM BusinessParty bp
                LEFT JOIN Address a ON bp.AddressID = a.AddressID
                LEFT JOIN BusinessEmail be ON bp.BusinessID = be.BusinessID
                LEFT JOIN Email e ON be.EmailID = e.EmailID
                LEFT JOIN EmailType et ON e.EmailTypeID = et.EmailTypeID
                LEFT JOIN BusinessPhone bph ON bp.BusinessID = bph.BusinessID
                LEFT JOIN Phone p ON bph.PhoneID = p.PhoneID
                LEFT JOIN PhoneType pt ON p.PhoneTypeID = pt.PhoneTypeID
                WHERE bp.BusinessID = @BusinessID
            `);

            if (!result.recordset.length) {
                return null;
            }

            const business = {
                businessInfo: {
                    businessId: result.recordset[0].BusinessID,
                    businessName: result.recordset[0].BusinessName,
                    contactPerson: result.recordset[0].ContactPerson,
                    isActive: !result.recordset[0].InActive
                },
                address: result.recordset[0].AddressID ? {
                    addressId: result.recordset[0].AddressID,
                    street: result.recordset[0].Street,
                    streetNo: result.recordset[0].StreetNo,
                    city: result.recordset[0].City,
                    state: result.recordset[0].State,
                    zipCode: result.recordset[0].ZIPCode,
                    county: result.recordset[0].County
                } : null,
                emails: [],
                phones: []
            };

            // Process emails
            const emailMap = new Map();
            result.recordset.forEach(record => {
                if (record.EmailID && !emailMap.has(record.EmailID)) {
                    emailMap.set(record.EmailID, {
                        emailId: record.EmailID,
                        emailAddress: record.EmailAddress,
                        emailType: {
                            id: record.EmailTypeID,
                            description: record.EmailType
                        }
                    });
                }
            });
            business.emails = Array.from(emailMap.values());

            // Process phones
            const phoneMap = new Map();
            result.recordset.forEach(record => {
                if (record.PhoneID && !phoneMap.has(record.PhoneID)) {
                    phoneMap.set(record.PhoneID, {
                        phoneId: record.PhoneID,
                        phoneNumber: record.PhoneNumber,
                        phoneType: {
                            id: record.PhoneTypeID,
                            description: record.PhoneType
                        }
                    });
                }
            });
            business.phones = Array.from(phoneMap.values());

            return business;
        } catch (error) {
            console.error('Error in getBusinessDetailsById:', error);
            throw error;
        }
    }



    // ... existing code ...



    // ... rest of your existing code ...


    static async updateBusinessDetailsById(businessId, updateData) {
        let pool;
        let transaction;

        try {
            pool = await poolPromise();
            transaction = new sql.Transaction(pool);
            await transaction.begin();

            // Update BusinessParty
            if (updateData.businessInfo) {
                const businessRequest = new sql.Request(transaction);
                await businessRequest
                    .input('BusinessID', sql.Int, businessId)
                    .input('BusinessName', sql.NVarChar, updateData.businessInfo.businessName)
                    .input('ContactPerson', sql.NVarChar, updateData.businessInfo.contactPerson)
                    .input('InActive', sql.Bit, !updateData.businessInfo.isActive)
                    .query(`
                        UPDATE BusinessParty 
                        SET BusinessName = @BusinessName,
                            ContactPerson = @ContactPerson,
                            InActive = @InActive
                        WHERE BusinessID = @BusinessID
                    `);
            }

            // Update Address
            if (updateData.address) {
                const addressRequest = new sql.Request(transaction);
                const addressResult = await addressRequest
                    .input('BusinessID', sql.Int, businessId)
                    .query('SELECT AddressID FROM BusinessParty WHERE BusinessID = @BusinessID');

                const addressId = addressResult.recordset[0]?.AddressID;

                if (addressId) {
                    const updateAddressRequest = new sql.Request(transaction);
                    await updateAddressRequest
                        .input('AddressID', sql.Int, addressId)
                        .input('Street', sql.NVarChar, updateData.address.street)
                        .input('StreetNo', sql.NVarChar, updateData.address.streetNo)
                        .input('City', sql.NVarChar, updateData.address.city)
                        .input('State', sql.NVarChar, updateData.address.state)
                        .input('ZIPCode', sql.NVarChar, updateData.address.zipCode)
                        .input('County', sql.NVarChar, updateData.address.county)
                        .query(`
                            UPDATE Address 
                            SET Street = @Street,
                                StreetNo = @StreetNo,
                                City = @City,
                                State = @State,
                                ZIPCode = @ZIPCode,
                                County = @County
                            WHERE AddressID = @AddressID
                        `);
                }
            }

            // Update Emails
            if (updateData.emails && updateData.emails.length > 0) {
                const emailRequest = new sql.Request(transaction);
                await emailRequest
                    .input('BusinessID', sql.Int, businessId)
                    .query('DELETE FROM BusinessEmail WHERE BusinessID = @BusinessID');

                for (const email of updateData.emails) {
                    const insertEmailRequest = new sql.Request(transaction);
                    await insertEmailRequest
                        .input('BusinessID', sql.Int, businessId)
                        .input('EmailID', sql.Int, email.emailId)
                        .query(`
                            INSERT INTO BusinessEmail (BusinessID, EmailID)
                            VALUES (@BusinessID, @EmailID)
                        `);
                }
            }

            // Update Phones
            if (updateData.phones && updateData.phones.length > 0) {
                const phoneRequest = new sql.Request(transaction);
                await phoneRequest
                    .input('BusinessID', sql.Int, businessId)
                    .query('DELETE FROM BusinessPhone WHERE BusinessID = @BusinessID');

                for (const phone of updateData.phones) {
                    const insertPhoneRequest = new sql.Request(transaction);
                    await insertPhoneRequest
                        .input('BusinessID', sql.Int, businessId)
                        .input('PhoneID', sql.NVarChar, phone.phoneId)
                        .query(`
                            INSERT INTO BusinessPhone (BusinessID, PhoneID)
                            VALUES (@BusinessID, @PhoneID)
                        `);
                }
            }

            await transaction.commit();
            return true;

        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            console.error('Error in updateBusinessDetailsById:', error);
            throw error;
        }
    }

    
    static async checkBusinessExists(businessId) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('BusinessID', sql.Int, businessId)
                .query(`
                        SELECT BusinessID 
                        FROM BusinessParty 
                        WHERE BusinessID = @BusinessID
                    `);

            return result.recordset.length > 0;
        } catch (error) {
            console.error('Error in checkBusinessExists:', error);
            throw error;
        }
    }
}

module.exports = ComplexQueryModel;