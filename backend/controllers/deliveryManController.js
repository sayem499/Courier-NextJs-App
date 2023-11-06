import expressAsyncHandler from "express-async-handler";
import DeliveryMans from "../models/deliveryManModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



//@dec Set delivery man data
//@route POST /api/deliveryman/set_deliveryman
//@access Private

const setDeliveryMan = expressAsyncHandler(async (req, res) => {

    const body = req.body;
    if (!body._id && !body.deliveryMan_phonenumber && !body.deliveryMan_password) {
        res.status(400);
        throw new Error('Deliveryman data field error.');
    }

    const deliveryManExists = await DeliveryMans.findOne({ deliveryMan_phonenumber: body.deliveryMan_phonenumber });

    if (deliveryManExists) {
        throw new Error('Deliveryman already exists with same phonenumber.');
    }

    const salt = await bcrypt.genSalt(10);
    body.deliveryMan_password = await bcrypt.hash(body.deliveryMan_password, salt);

    const deliveryMan = await DeliveryMans.create({
        _id: body._id,
        deliveryMan_username: body.deliveryMan_username,
        deliveryMan_phonenumber: body.deliveryMan_phonenumber,
        deliveryMan_email: body.deliveryMan_email,
        deliveryMan_password: body.deliveryMan_password,
    });

    if (deliveryMan) {
        res.status(201).json({
            _id: deliveryMan._id,
            deliveryMan_username: deliveryMan.deliveryMan_username,
            deliveryMan_phonenumber: deliveryMan.deliveryMan_phonenumber,
            deliveryMan_email: deliveryMan.deliveryMan_email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid data.');
    }


})


//@desc Auth delivery man
//@route POST /api/deliveryman/auth_deliveryman
//@access Public

const authDeliveryMan = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const deliveryMan = await DeliveryMans.findOne({ deliveryMan_phonenumber: body.deliveryMan_phonenumber });
    if (deliveryMan && (await bcrypt.compare(body.deliveryMan_password, deliveryMan.deliveryMan_password))) {
        generateToken(res, body._id);
        res.status(201).json({
            _id: deliveryMan._id,
            deliveryMan_username: deliveryMan.deliveryMan_username,
            deliveryMan_phonenumber: deliveryMan.deliveryMan_phonenumber,
            deliveryMan_email: deliveryMan.deliveryMan_email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid data.')
    }
})

//@desc logout delivery man
//@route POST /api/deliveryman/logout_deliveryman
//@access Private

const logoutDelieryMan = expressAsyncHandler( async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message: 'Logged Out!' });
})

const generateToken = (res, _id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET);
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    });
}


export { setDeliveryMan, authDeliveryMan, logoutDelieryMan }