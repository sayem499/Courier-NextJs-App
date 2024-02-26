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
        delieryMan_image: body.deliveryMan_image,
    });

    if (deliveryMan) {
        res.status(201).json({
            _id: deliveryMan._id,
            deliveryMan_username: deliveryMan.deliveryMan_username,
            deliveryMan_phonenumber: deliveryMan.deliveryMan_phonenumber,
            deliveryMan_email: deliveryMan.deliveryMan_email,
            delieryMan_image: deliveryMan.deliveryMan_image,
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
            deliveryMan_image: deliveryMan.deliveryMan_image,
        });
    } else {
        res.status(400);
        throw new Error('Invalid data.')
    }
})


//@desc Update deliveryman
//@route PUT /api/deliveryman/update_deliveryman
//@access Private
const updateDelievryman = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const deliveryMan = await DeliveryMans.findById(body._id);
    let salt;

    if (deliveryMan) {
        if(body.deliveryMan_password) {
            salt = await bcrypt.genSalt(10);
            body.deliveryMan_password = await bcrypt.hash(body.deliveryMan_password, salt);
        } 
        deliveryMan.deliveryMan_password = body.deliveryMan_password || deliveryMan.deliveryMan_password
        deliveryMan._id = body._id || deliveryMan._id;
        deliveryMan.deliveryMan_username = body.deliveryMan_username || deliveryMan.deliveryMan_username;
        deliveryMan.deliveryMan_phonenumber = body.deliveryMan_phonenumber || deliveryMan.deliveryMan_phonenumber;
        deliveryMan.deliveryMan_email = body.deliveryMan_email || deliveryMan.deliveryMan_email;
        deliveryMan.deliveryMan_image = body.deliveryMan_image || deliveryMan.deliveryMan_image;

        const updatedDelievryman = await deliveryMan.save();

        if (updatedDelievryman) {
            res.status(201).json(
                {
                    _id: updatedDelievryman._id,
                    deliveryMan_username: updatedDelievryman.deliveryMan_username,
                    deliveryMan_phonenumber: updatedDelievryman.deliveryMan_phonenumber,
                    deliveryMan_email: updatedDelievryman.deliveryMan_email,
                    deliveryMan_image: updatedDelievryman.deliveryMan_image,
                }
            )
        } else {
            res.status(400);
            throw new Error('Invalid Data!');
        }
    }
})


//@desc Get deliveryman with phonenumber
//@route POST /api/deliveryman/get_with_phonenumber_admin
//@access Private

const getDeliverymanWithPhonenumber = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const deliveryMan = await DeliveryMans.find({ deliveryMan_phonenumber: body.deliveryMan_phonenumber });
    
    if (deliveryMan) {
        res.status(201).json([{
            _id: deliveryMan[0]._id,
            deliveryMan_username: deliveryMan[0].deliveryMan_username,
            deliveryMan_phonenumber: deliveryMan[0].deliveryMan_phonenumber,
            deliveryMan_email: deliveryMan[0].deliveryMan_email,
            deliveryMan_image: deliveryMan[0].delieryMan_image,
        }])
    }else {
       res.status(400);
       throw new Error('Invalid deliveryman data!') 
    }
})


//@desc logout delivery man
//@route POST /api/deliveryman/logout_deliveryman
//@access Private

const logoutDelieryMan = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({ message: 'Logged Out!' });
})

const generateToken = (res, _id) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, {
        httpOnly: process.env.NODE_ENV === 'development',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    });
}


export { setDeliveryMan, authDeliveryMan, updateDelievryman, getDeliverymanWithPhonenumber, logoutDelieryMan }