const express = require("express");
const router = express.Router();

const controller = require("../controller/ClassRoutine.controller");


// ==========================
// WEEKLY ROUTES (ADMIN)
// ==========================

// ADD WEEKLY
// router.post("/weekly/add", controller.addWeeklyClass);

// // GET ALL WEEKLY
router.get("/weekly/get", controller.WeeklyClassGet);

// // GET SINGLE DAY
// router.get("/weekly/singleday/:day", controller.getWeeklyByDay);

// // EDIT WEEKLY (only classes, no day change)
// router.put("/weekly/:id", controller.editWeeklyClass);

// // DELETE WEEKLY
// router.delete("/weekly/delete/:day", controller.deleteWeeklyClass);




// // ==========================
// // TODAY ROUTES
// // ==========================

// // GET TODAY CLASS (auto lazy copy)
// router.get("/today/get", controller.getTodayClass);

// // ADD MULTIPLE CLASS TODAY
// router.post("/today/add", controller.addTodayClass);

// // EDIT CLASS (by index)
// router.put("/today/edit/:index", controller.editTodayClass);

// // DELETE CLASS (by index)
// router.delete("/today/:index", controller.deleteTodayClass);
// router.delete("/today/delete/:index", controller.deleteTodayClass);




module.exports = router;