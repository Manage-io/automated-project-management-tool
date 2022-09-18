import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    date: { type: Date, default: Date.now },
    avatar: { type: String, default: null },
    authorized: { type: Boolean, default: false },
    activeStatus: { type: Boolean, default: false },
    inProject: [
        {
            projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            designationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation', required: true }
        }
    ],
    otpCode: { type: String, required: false },
    type: { type: String, enum: { values: ['Cred', 'OAuth'] }, default: 'Cred' },
});


export default mongoose.models?.User || mongoose.model('User', UserSchema);