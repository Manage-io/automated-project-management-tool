import bcrypt from 'bcryptjs';

import connectToMongo from '../../../utils/dbConnect';
import UserModel from '../../../models/User';


// Creating a New user and Sent a otp to the email given.
const handler = async (req, res) => {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }

    try {
        connectToMongo();
        const { id, newPass } = req.body;

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(newPass, salt);

        await UserModel.findByIdAndUpdate(id, {
            password: securePassword
        });

        res.json({ resStatus: true, message: 'Password Updated Succesfully.' })

    } catch (err) {
        res.status(500).json({ resStatus: false, err: err.message, code: err.code || 'SGE' })
    }
}


export default handler;