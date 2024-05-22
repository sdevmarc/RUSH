const AdminUsers = require('../../models/Admin/Admin.Users')
const { exec } = require('child_process');
const path = require('path');

const dbName = 'rush';

const mongodumpPath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump"';
const mongorestorePath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongorestore"';

const AdminUserController = {
    CreateUser: async (req, res) => {
        try {
            const values = req.body

            await AdminUsers.create(values)
            res.json({ success: true, message: 'User added successfully!' })
        } catch (error) {
            res.json({ success: false, message: `Error adding user controller: ${error}` })
        }
    },
    GetAllAdminUsers: async (req, res) => {
        try {
            const data = await AdminUsers.find()
            res.json({ success: true, message: 'User added successfully!', data })
        } catch (error) {
            res.json({ success: false, message: `Error getting admin user controller: ${error}` })
        }
    },
    LoginAdminUser: async (req, res) => {
        try {

        } catch (error) {
            res.json({ success: false, message: `Error Login admin user controller: ${error}` })
        }
    },
    BackUp: async (req, res) => {
        try {
            exec(`${mongodumpPath} --db ${dbName} --out ${dbName}_backups`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    return res.json({ success: false, message: 'Failed to backup database!' });
                }
                res.json({ success: true, message: 'Backup completed successfully!' });
            });
        } catch (error) {
            res.json({ success: false, message: `Error Backup controller: ${error}` });
        }
    },

    Restore: async (req, res) => {
        try {
            exec(`${mongorestorePath} ${dbName}_backups`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error restoring backup: ${stderr}`);
                    return res.json({ success: false, message: `Error restoring backup: ${stderr}` });
                }
                res.json({ success: true, message: 'Restore completed successfully!' });
            });
        } catch (error) {
            res.json({ success: false, message: `Error Restore controller: ${error}` });
        }
    }

}

module.exports = AdminUserController