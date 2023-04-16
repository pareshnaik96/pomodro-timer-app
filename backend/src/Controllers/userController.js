const admin = require('../config/firebase-config')


const verifyUser = async (req, res) => {

    try {

        const token = req.query.token;
        const decodedToken = await admin.auth().verifyIdToken(token);
        return res.status(200).send(decodedToken);

    } catch (error) {
        return res.status(401).send({ status: false, message: 'Unauthorized' });
    }
}

module.exports = { verifyUser }


