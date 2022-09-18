import { createTransport } from 'nodemailer';


const handler = async (req, res) => {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }

    try {
        const { to, subject, body, template = "", message } = req.body;
        const sender = {
            host: "smtp.gmail.com",
            port: 465
        }

        const transporter = createTransport({
            ...sender,
            secure: sender.port === 465 ? true : false,
            auth: {
                user: process.env.SMTP_GMAIL_ID,
                pass: process.env.SMTP_GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_GMAIL_ID,
            to: to,
            subject: subject,
            text: body,
            html: template
        })

        res.status(200).json({
            resStatus: true,
            email: to,
            message: message || "Message sent."
        })
    } catch (err) {
        res.status(500).send({ resStatus: false, err: err.message, code: 'SGE' });
    }
}


export default handler;