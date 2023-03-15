const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

router.post("/createStudent", studentController.createStudent);
router.get("/getAllAssignments/:studentId", studentController.getAllAssignments);
router.get("/getAssignment/:assignmentId", studentController.getAssignment);

module.exports = router;