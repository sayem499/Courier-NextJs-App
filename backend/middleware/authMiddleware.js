import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import Users from '../models/userModel.js';

const protect = expressAsyncHandler( async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Users.findById(decoded._id).select('-user_password');
            next();

        } catch (error){
            res.status(401);
            throw new Error('Not aouthorized, invalid token!');
        }    
    } else {
        res.status(401);
        throw new Error('Not authorized, no token!');
    }
});


export {protect};