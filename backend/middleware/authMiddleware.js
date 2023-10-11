import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import Users from '../models/userModel.js';
import Admins from '../models/adminModel.js';

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

const protectAdmin = expressAsyncHandler( async (req, res, next) => {
    let token = req.cookies.jwtadmin;

    if(token){

        try{
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admins.findById(decoded._id).select('-admin_password');
            next();

        }catch(err){
            res.status(401);
            throw new Error('Not authorized! invalid token.');
        }   

    } else {
        res.status(401);
        throw new Error('Not authorizied, no token!');
    }

})

export { protect, protectAdmin };