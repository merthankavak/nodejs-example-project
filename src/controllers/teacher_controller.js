const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Assignment = require('../models/assignment');

/**  
 * @route POST api/teacher/createTeacher
 * @desc Create teacher
*/
const createTeacher = async (req, res) => {
    const { name, email } = req.body;

    try {
        const isTeacherExist = await Teacher.findOne({ email });
        if (isTeacherExist) {
            return res.status(400).json({ error: 'Teacher already exist!' });
        }
        const teacher = new Teacher({
            name,
            email
        });

        // Save teacher doc
        const newTeacher = await teacher.save();

        return res.status(201).json(newTeacher);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

/**  
 * @route POST api/teacher/createAssignment
 * @desc Add new assignment
*/
const createAssignment = async (req, res) => {
    const { name, details, teacherId, studentsArray } = req.body;

    try {

        const teacher = await Teacher.findById(teacherId).select('name email');

        const students = await Promise.all(studentsArray.map(async (name) => {
            const student = await Student.findOne({ name });
            return student;
        }));

        let assignment = new Assignment({
            name,
            details,
            teacher,
            students
        });

        // Save assignment doc
        const newAssignment = await assignment.save();

        // Update student doc
        const updateStudentPromises = students.map(student => {
            return Student.updateOne(
                { _id: student._id },
                { $push: { assignments: newAssignment._id } }
            );
        });
        await Promise.all(updateStudentPromises);

        // Update teacher doc
        await Teacher.findByIdAndUpdate(
            teacherId,
            { $push: { assignments: newAssignment._id } },
            { new: true }
        );

        await newAssignment.populate({ path: 'students', select: 'name email' });

        return res.status(201).json(newAssignment);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

/**  
 * @route GET api/teacher/getAllAssignments/:teacherId
 * @desc Get all assignments
*/
const getAllAssignments = async (req, res) => {
    const teacherId = req.params.teacherId;

    try {
        const assignments = await Assignment.find({ teacher: teacherId }).populate({
            path: 'teacher',
            select: 'name email'
        }).populate({
            path: 'students',
            select: 'name email'
        });

        return res.status(200).json(assignments);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

/**  
 * @route GET api/teacher/getAssignment/:assignmentId
 * @desc Get assignment
*/
const getAssignment = async (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = await Assignment.findById(assignmentId).populate({
            path: 'teacher',
            select: 'name email'
        }).populate({
            path: 'students',
            select: 'name email'
        });

        return res.status(200).json(assignment);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

module.exports = {
    createTeacher,
    createAssignment,
    getAllAssignments,
    getAssignment
}