export default async function handler(req, res) {
    if (req.method != "POST") {
        return res.status(404).end('API Route (' + req.method + ') Unavailable.');
    }


    res.status(200).json({ name: 'Something Name', type: 'POST' })

}