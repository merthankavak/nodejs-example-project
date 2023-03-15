const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    name: { type: String, default: '' },
    details: { type: String, default: '' },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
}, {
    timestamps: true,
});

const assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = assignment

