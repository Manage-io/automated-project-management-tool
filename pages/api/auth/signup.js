import bcrypt from 'bcryptjs';

import connectToMongo from '../../../utils/dbConnect';
import UserModel from '../../../models/User';

import SMTP_Mail_Handler from '../SMTP-Mail/index';


// Creating a New user and Sent a otp to the email given.
const signUp = handler => async (req, res) => {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }

    try {
        connectToMongo();
        const { userName, email, password } = req.body;
        let user = await UserModel.findOne({ email: email });

        if (user && user.authorized) {
            throw ({ message: "Credentials Already Exist.", code: 'UAE' })
        }

        const salt = await bcrypt.genSalt(10);
        const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
        const secureOTP = await bcrypt.hash(otp, salt);
        const securePassword = await bcrypt.hash(password, salt);

        if (!user) {
            user = await UserModel.create({
                name: userName,
                email: email,
                password: securePassword,
                otpCode: secureOTP,
            })
        }
        else {
            await UserModel.findOneAndUpdate({ email: email }, {
                name: userName,
                password: securePassword,
                otpCode: secureOTP,
            });
        }

        req.body = {
            to: email,
            subject: "OTP for Confirming Account.",
            body: `Your OTP Code is: ${otp}`
        }
        return handler(req, res);

    } catch (err) {
        res.status(400).json({ resStatus: false, err: err.message, code: err.code || 'SGE' })
    }
}


export default signUp(SMTP_Mail_Handler);