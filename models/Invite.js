import mongoose from "mongoose";


const BugSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    designationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation', required: true },
    email: { type: String, required: true },
    accepted: { type: Boolean, default: false },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


export default mongoose.models?.Bug || mongoose.model('Bug', BugSchema);