import AsyncHandler from 'express-async-handler';
import Deliveries from '../models/deliveryModel.js';


//@desc set delivery
//@route POST /api/delivery/set_selivery
//@access Private
const setDelivery = AsyncHandler( async(req, res) => {
    const body = req.body;
    const delivery = await Deliveries.create({
        _id: body._id,
        deliveryMan_phonenumber: body.deliveryMan_phonenumber,
        deliveries: body.deliveries,
        pickups: body.pickups,
    });

    if(delivery){
        res.status(201).json({
            message: 'Delivery created successfully!',
        });
    }else {
        res.status(400)
        throw new Error('Invalid delivery data!');
    }

})

//@desc get delivery with phonenumber
//@route POST /api/delivery/get_with_phonenumber
//@access Private
const getdeliveryWithPhonenumber = AsyncHandler( async(req, res) => {
    const body = req.body;
    const delivery = await Deliveries.find({deliveryMan_phonenumber: body.deliveryMan_phonenumber});

    if(delivery){
        res.status(201).json(delivery);
    }else{
        res.status(400);
        throw new Error('Invalid delivery data!');
    }
})


//@desc update delivery
//@route PUT /api/delivery/update_delivery
//@access Private
const updateDeliveryWithPhonenumber = AsyncHandler( async(req, res) => {
    const body = req.body;
    let delivery = await Deliveries.find({deliveryMan_phonenumber: body.deliveryMan_phonenumber});
    if(delivery){
        delivery?.map((item) => {
            body.pickups?.length > 0 ? item.pickups?.push(body.pickups.toString()) : (body.pickups?.lenght > 0 ? item.pickups = [...body.pickups] : item.pickups = item.pickups);
            body.deliveries?.length > 0 ? item.deliveries?.push(body.deliveries.toString()) : (body.deliveries?.lenght > 0 ? item.deliveries = [...body.deliveries] : item.deliveries = item.deliveries);
            item._id = body._id || item._id;
            item.deliveryMan_phonenumber = body.deliveryMan_phonenumber || item.deliveryMan_phonenumber;
    })
        const updatedDelivery = await delivery[0].save();
        if(updatedDelivery){
            res.status(201).json({
                deliveryMan_phonenumber: updatedDelivery.deliveryMan_phonenumber,
                deliveries: updatedDelivery.deliveries,
                pickups: updatedDelivery.pickups
            });
        }else {
            res.status(500);
            throw new Error('Internal server error.')
        }
    }else {
        res.status(400)
        throw new Error('Invalid delivery data.')
    }
})

export { setDelivery, updateDeliveryWithPhonenumber, getdeliveryWithPhonenumber }