import asyncHandler from 'express-async-handler';
import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//@desc     Auth user/set token 
//@route    POST /api/users/auth
//@access   Public
const authUser = asyncHandler ( async (req, res) => {

    const body = req.body;
    const user = await Users.findOne({user_email: body.user_email})
    if( user && (await bcrypt.compare(body.user_password, user.user_password)) ) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            user_email: user.user_email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc     Register user 
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler ( async (req, res) => {
    const body = req.body;
    if( !req.body._id &&
        !req.body.user_firstname &&
        !req.body.user_lastname &&
        !req.body.user_email && 
        !req.body.user_password &&
        !req.body.user_phonenumber ){
            res.status(400);
            throw new Error('User field error!');
        }

    const userExists = await Users.findOne({user_email: body.user_email}); 
    
    if(userExists) {
        res.status(400);
        throw new Error('User already exsists with same email!' );
    }

    const salt = await bcrypt.genSalt(10);
    body.user_password = await bcrypt.hash(body.user_password, salt);  
    const user = await Users.create({
        _id: body._id,
        user_firstname: body.user_firstname,
        user_lastname: body.user_lastname,
        user_email: body.user_email,
        user_password: body.user_password,
        user_phonenumber: body.user_phonenumber,
    });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            user_email: user.user_email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});


//@desc     Logout user 
//@route    POST /api/users/logout
//@access   Public
const logoutUser = asyncHandler ( (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({ message: 'Logged Out!' });
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler ( (req, res) => {
    res.status(200).json({ message: 'User Profile' });
});

//@desc     Get user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler ( (req, res) => {
    res.status(200).json({ message: 'Update User Profile' });
});

//Generate JWT token in cookie
const generateToken = (res, id) => {
   const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    }); 

   res.cookie('jwt', token, {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge:  24 * 60 * 60 * 1000 ,
   });
}

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };

