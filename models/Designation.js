import mongoose from "mongoose";


const DesignationSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    createdFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
    custom: { type: Boolean, default: true },
    assigned: { type: Number, default: 0 },
    designation: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    invite: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    module: {
        view: { type: String, enum: ['False', 'Assigned', 'Completed', 'All'], default: 'False' },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        assign: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    },
    bug: {
        view: { type: String, enum: ['False', 'Assigned', 'Completed', 'All'], default: 'False' },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        assign: { type: Boolean, default: false }
    }
});


export default mongoose.models?.Designation || mongoose.model('Designation', DesignationSchema);