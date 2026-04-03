const express = require('express');
const router = express.Router();
const AuthUserController = require ('../controller/AuthUser.controller')
const AuthMiddileware = require('../middelwares/Auth.middleware')






router.post('/student/register', AuthMiddileware.AuthAdminMiddileware , AuthUserController.registerStudent,  )
router.post('/student/login', AuthUserController.loginStudent )
router.post('/admin/register', AuthUserController.registerAdmin )
router.post('/admin/login', AuthUserController.loginAdmin )
router.post('/teacher/register', AuthMiddileware.AuthAdminMiddileware , AuthUserController.registerTeacher )
router.post('/teacher/login', AuthUserController.loginTeacher )
router.post('/student/logout', AuthUserController.logoutStudent)
router.post('/admin/logout', AuthUserController.logoutAdmin)
router.post('/teacher/logout', AuthUserController.logoutTeacher)
router.get('/loggedinStudent/find', AuthUserController.findstudent)
router.get('/loggedinTeacher/find', AuthUserController.findteacher)
router.get('/loggedinAdmin/find', AuthUserController.findadmin)
router.get('/getAllStudent', AuthUserController.getAllStudent)
router.get('/getAllteacher', AuthUserController.getAllteacher)
router.delete('/deleteStudent/:id', AuthMiddileware.AuthAdminMiddileware, AuthUserController.deleteStudent)







module.exports = router;