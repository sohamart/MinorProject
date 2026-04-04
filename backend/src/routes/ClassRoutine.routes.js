const express = require('express');
const router = express.Router();
const ClassRoutineController = require ('../controller/ClassRoutine.controller')
const AuthMiddileware = require('../middelwares/Auth.middleware')




router.post('/weeklyclass/add', AuthMiddileware.AuthAdminMiddileware , ClassRoutineController.addWeeklyClass)
router.get('/todayclass/find', ClassRoutineController.TodayClass)




module.exports = router;