const express = require('express')
const router = express.Router()

const Admin = require('../../controllers/Admin/Admin.controller')

router.post('/admin/adduser', Admin.CreateUser)
router.post('/admin/login', Admin.LoginAdminUser)
router.get('/admin/getall', Admin.GetAllAdminUsers)
router.get('/admin/backup', Admin.BackUp)
router.get('/admin/restore', Admin.Restore)
router.get('/admin/searcuser/:searchId', Admin.SearchUsers)
router.post('/admin/updateuser/:id', Admin.UpdateUser)

module.exports = router