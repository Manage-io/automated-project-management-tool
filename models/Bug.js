import mongoose from "mongoose";


const BugSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    name: { type: String, required: true, minlength: 6 },
    description: { type: String, required: true, minlength: 10 },
    priority: { type: String, enum: ['Low', 'Normal', 'High'] },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed', 'Deffered'] },
    assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


export default mongoose.models?.Bug || mongoose.model('Bug', BugSchema);