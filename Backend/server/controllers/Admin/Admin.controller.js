const AdminUsers = require('../../models/Admin/Admin.Users')
const { exec } = require('child_process')

const dbName = 'rush';

const mongodumpPath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump"';
const mongorestorePath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongorestore"';

const AdminUserController = {
    CreateUser: async (req, res) => {
        try {
            const { username, password } = req.body

            const checkUsername = await AdminUsers.findOne({
                username: username
            })

            const usernameInvalidChars = /[^a-zA-Z0-9_-]/
            const passwordfCheck = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/

            if (usernameInvalidChars.test(username)) {
                return res.json({ success: false, message: 'Username contains invalid characters. Only letters, numbers, underscores, and hyphens are allowed.' })
            }

            if (!passwordfCheck.test(password)) {
                return res.json({ success: false, message: 'Password must be at least 8 characters long, contain at least one special character, and one number.' })
            }

            if (checkUsername) return res.json({ success: false, message: 'User already exists!' })


            await AdminUsers.create({ username, password })
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
            const { username, password } = req.body
            const User = await AdminUsers.findOne({ username: username })

            if (User) {
                if (password === User.password) {
                    res.json({ success: true, message: 'Login successful!' })
                } else {
                    res.json({ success: false, message: 'Username nor Password Incorrect!' });
                }
            } else {
                res.json({ success: false, message: 'User does not exist!' })
            }
        } catch (error) {
            return next(`Error Login Auth: ${error}`)
        }
    }, 
    SearchUsers: async (req, res) => {
        try {
            const { searchId } = req.params

            const checkusers = await AdminUsers.find({
                username: { $regex: new RegExp(searchId, 'i') }
            })

            res.json({ success: true, message: 'Searching a user is successful!', data: checkusers })

        } catch (error) {
            res.json({ success: false, message: `Search user error from controller: ${error}` })
        }
    },
    UpdateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, password } = req.body;

            const user = await AdminUsers.findById(id);
            if (!user) {
                return res.json({ success: false, message: 'User not found!' });
            }

            const usernameInvalidChars = /[^a-zA-Z0-9_-]/;
            const passwordfCheck = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/;

            if (usernameInvalidChars.test(username)) {
                return res.json({ success: false, message: 'Username contains invalid characters. Only letters, numbers, underscores, and hyphens are allowed.' });
            }

            if (!passwordfCheck.test(password)) {
                return res.json({ success: false, message: 'Password must be at least 8 characters long, contain at least one special character, and one number.' });
            }

            const checkUsername = await AdminUsers.findOne({ username });
            if (checkUsername && checkUsername._id.toString() !== id) {
                return res.json({ success: false, message: 'Username already taken!' });
            }

            await AdminUsers.findByIdAndUpdate(id, { username, password });
            res.json({ success: true, message: 'User updated successfully!' });
        } catch (error) {
            res.json({ success: false, message: `Error updating user: ${error}` });
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