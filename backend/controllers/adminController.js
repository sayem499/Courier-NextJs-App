import expressAsyncHandler from "express-async-handler";
import Admins from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//@desc Token check
//@route GET /api/admins/token_check
//@access Private
const adminTokenCheck = expressAsyncHandler ( async (req, res) => {
    const body = req.body;
    if(body){
        res.status(201);
    }
})


//@desc Auth admin/set token
//@route POST /api/admins/auth
//@access Public
const authAdmin = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const admin = await Admins.findOne({admin_eamil: body.admin_eamil});
    if( admin && (bcrypt.compare(body.admin_password, admin.admin_password))){
        generateToken(res, body._id);
        res.status(201).json({
            _id: admin._id,
            admin_email: admin.admin_email,
        })
    }else {
        res.status(400);
        throw new Error('Invalid admin data.');
    }
});


//@desc Register admin
//@route POST /api/admins/register
//@access Private
const registerAdmin = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    if(!body._id && !body.admin_eamil && !body.admin_password){
        res.status(400);
        throw new Error('Admin data field error.');
    }

    const adminExists = await Admins.findOne({admin_email: body.admin_email});

    if(adminExists){
        throw new Error('Admin already exists with same email.'); 
    }

    const salt = await bcrypt.genSalt(10);
    body.admin_password = await bcrypt.hash(body.admin_password, salt);

    const admin = await Admins.create({
        _id: body._id,
        admin_eamil: body.admin_eamil,
        admin_password: body.password,
    });

    if(!admin){
        res.status(400);
        throw new Error('Invalid admin data.');
    }
})


//@dec Get all admin data
//@route GET /api/admins/all
//@access Private
const getAdmin = expressAsyncHandler( async (req, res) => {
    const admins  = await Admins.find({});

    if(admins){
        res.status(201).json(admins);
    }else {
        res.status(400)
        throw new Error('Admin data not found.');
    }
})

//@desc     Logout admin 
//@route    POST /api/admins/logout
//@access   Public
const logoutAdmin = expressAsyncHandler ( (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({ message: 'Logged Out!' });
});


//@desc     Update admin profile
//@route    PUT /api/admins/profile
//@access   Private
const updateAdminData = expressAsyncHandler ( async (req, res) => {
    const admin = await Admins.findById(req.body._id);
    if(admin){
        admin.admin_email = req.body.admin_email || admin.admin_email;
        if(req.body.admin_password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.admin_password, salt);
            admin.admin_password = hashedPassword;
        }

        const updatedAdmin = await admin.save();
        res.status(200).json({
            _id: updatedAdmin._id,
            admin_email: updatedAdmin.admin_email,
        }); 

    } else {
        res.status(400);
        throw new Error('Admin not found!');
    }
});



//Generate JWT token in cookie
const generateToken = (res, _id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {
         expiresIn: '6h',
     }); 
 
    res.cookie('jwt', token, {
     httpOnly: true,
     secure: process.env.NODE_ENV !== 'development',
     sameSite: 'strict',
     maxAge:  6 * 60 * 60 * 1000 ,
    });
 }

export { adminTokenCheck, getAdmin, authAdmin, registerAdmin, logoutAdmin, updateAdminData };