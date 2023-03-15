const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher_controller');

router.post("/createTeacher", teacherController.createTeacher);
router.post("/createAssignment", teacherController.createAssignment);
router.get("/getAllAssignments/:teacherId", teacherController.getAllAssignments);
router.get("/getAssignment/:assignmentId", teacherController.getAssignment);

module.exports = router;