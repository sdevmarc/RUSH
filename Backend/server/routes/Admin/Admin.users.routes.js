const express = require('express')
const router = express.Router()

const Admin = require('../../controllers/Admin/Admin.controller')

router.post('/admin/adduser', Admin.CreateUser)
router.get('/admin/getall', Admin.GetAllAdminUsers)
router.get('/admin/backup', Admin.BackUp)
router.get('/admin/restore', Admin.Restore)

module.exports = router