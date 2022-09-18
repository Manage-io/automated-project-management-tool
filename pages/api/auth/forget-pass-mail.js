import { encode } from 'jwt-simple';

import connectToMongo from '../../../utils/dbConnect';
import UserModel from '../../../models/User';

import SMTP_Mail_Handler from '../SMTP-Mail/index';


// Creating a New user and Sent a otp to the email given.
const forgetPassMail = handler => async (req, res) => {
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

        const jwtToken = encode(
            { id: user._id },
            process.env.JWT_SECRECT_KEY,
            'HS256',
            { expiresIn: 60 * 60 }
        );

        req.body = {
            to: email,
            subject: "Password Reset Link.",
            body: `${process.env.HOME_URI}/reset-pass?token=${jwtToken}`,
            message: "Reset Link sent to your email."
        }
        return handler(req, res);

    } catch (err) {
        res.status(500).json({ resStatus: false, err: err.message, code: err.code || 'SGE' })
    }
}


export default forgetPassMail(SMTP_Mail_Handler);