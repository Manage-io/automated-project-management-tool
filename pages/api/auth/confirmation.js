import bcrypt from 'bcryptjs';

import connectToMongo from '../../../utils/dbConnect';
import UserModel from '../../../models/User';



// Check the otp and activate the user account.
const handler = async (req, res) => {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }

    try {
        connectToMongo();
        const { email, code } = req.body;
        let user = await UserModel.findOne({ email: email });

        if (!user) {
            throw ({ message: "No User Found.", code: 'UNE' });
        }
        else if (user.authorized) {
            throw ({ message: "Credentials Already Exist.", code: 'UAE' });
        }
        else {
            if (await bcrypt.compare(code, user.otpCode)) {
                user.authorized = true;
                user.activeStatus = true;
                await user.save();

                res.json({ resStatus: true, body: "Account Created Successfully." });
            }
            else {
                throw ({ message: "Invalid OTP.", code: 'OCI' });
            }
        }
    } catch (err) {
        res.status(400).json({ resStatus: false, err: err.message, code: err.code || 'SGE' })
    }
}


export default handler;