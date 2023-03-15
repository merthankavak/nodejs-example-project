const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String },
    email: { type: String },
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
}, {
    timestamps: true,
});

const student = mongoose.model('Student', studentSchema);

module.exports = student

