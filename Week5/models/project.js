const mongoose = require('mongoose');

const dataSchemaObject = {
    name: {type: String, required: true},
    dueDate: {type: Date},
    course: {type: String, required: true},
    status: {type: String, default: "To Do"},
};

const schema = mongoose.Schema(dataSchemaObject);
module.exports = mongoose.model('Project', schema);