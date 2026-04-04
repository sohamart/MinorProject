const express = require('express');
const router = express.Router();

const controller = require('../controller/ClassRoutine.controller');

// Weekly (Admin)
router.post('/weekly/add', controller.addWeeklyClass);
router.delete('/weekly/delete/:day', controller.deleteWeeklyClass);
router.post('/weeklyclass/add', controller.addWeeklyClass)
router.get('/weekly', controller.getWeeklyClasses)
router.delete('/weeklyclass/delete/:day', controller.deleteWeeklyClass)

// Today
router.get('/today', controller.TodayClass);
router.post('/today/add', controller.addTodayClassItem);
router.put('/today/update/:id', controller.updateTodayClassItem);
router.delete('/today/delete/:id', controller.deleteTodayClassItem);

module.exports = router;