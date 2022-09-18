import mongoose from "mongoose";


const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 6 },
    description: { type: String, required: true, minlength: 10 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    joined: { type: Number, default: 0 },
    draft: { type: Boolean, default: true },
    published: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now() },
    publishDate: { type: Date, default: null }
});


export default mongoose.models?.Project || mongoose.model('Project', ProjectSchema);