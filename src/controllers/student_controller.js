const Student = require('../models/student');
const Assignment = require('../models/assignment');

/**  
 * @route POST api/student/createStudent
 * @desc Create student
*/
const createStudent = async (req, res) => {
    const { name, email } = req.body;

    try {
        const isStudentExist = await Student.findOne({ email });

        if (isStudentExist) {
            return res.status(400).json({ error: 'Student already exist!' });
        }

        const student = new Student({
            name,
            email
        });

        // Save student doc
        const newStudent = await student.save();

        return res.status(201).json(newStudent);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

/**  
 * @route GET api/student/getAllAssignments/:studentId
 * @desc Get all assignments
*/
const getAllAssignments = async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const assignments = await Assignment.find({ 'students': studentId }).select('name details teacher')
            .populate({
                path: 'teacher',
                select: 'name email'
            });

        return res.status(200).json(assignments);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

/**  
 * @route GET api/student/getAssignment/:assignmentId
 * @desc Get assignment
*/
const getAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = await Assignment.findById(assignmentId).select('name details teacher').populate({
            path: 'teacher',
            select: 'name email'
        });

        return res.status(200).json(assignment);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}


module.exports = {
    createStudent,
    getAllAssignments,
    getAssignment
}