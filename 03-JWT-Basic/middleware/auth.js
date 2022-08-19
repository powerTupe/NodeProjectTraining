const { UnauthenticateError } = require("../errors");
const jwt = require('jsonwebtoken');

const authenticationMiddleWare = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticateError('No token Provided');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); 
        const {id, username} = decode;
        req.user = {id, username};
        next();
    } catch (error) {
        throw new UnauthenticateError('No authorise access to this route');
    }
}

module.exports = authenticationMiddleWare;