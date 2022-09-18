import bcrypt from 'bcryptjs';

import connectToMongo from '../../../utils/dbConnect';
import UserModel from '../../../models/User';

import SMTP_Mail_Handler from '../SMTP-Mail/index';


// Creating a New user and Sent a otp to the email given.
const resendOtp = handler => async (req, res) => {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }

    try {
        connectToMongo();
        const { email } = req.body;
        let user = await UserModel.findOne({ email: email });

        if (!user) {
            throw ({ message: "Email Not Found.", code: 'ENF' })
        }

        const salt = await bcrypt.genSalt(10);
        const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
        const secureOTP = await bcrypt.hash(otp, salt);

        user.otpCode = secureOTP;
        await user.save();

        req.body = {
            to: email,
            subject: "OTP for Your Account.",
            body: `Your OTP Code is: ${otp}`,
            message: "OTP sent to your email."
        }
        return handler(req, res);

    } catch (err) {
        res.status(500).json({ resStatus: false, err: err.message, code: err.code || 'SGE' })
    }
}


export default resendOtp(SMTP_Mail_Handler);