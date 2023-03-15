const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: { type: String },
    email: { type: String },
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
}, {
    timestamps: true,
});

const teacher = mongoose.model('Teacher', teacherSchema);

module.exports = teacher

