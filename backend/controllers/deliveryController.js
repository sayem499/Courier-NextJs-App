import AsyncHandler from 'express-async-handler';
import Deliveries from '../models/deliveryModel';


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

//@desc update delivery
//@route PUT /api/delivery/update_delivery
//@access Private
const updateDeliveryWithPhonenumber = AsyncHandler( async(req, res) => {
    const body = req.body;
    const delivery = await Deliveries.find({deliveryMan_phonenumber: body.deliveryMan_phonenumber});
    if(delivery){
        delivery.pickups = [...body.pickups];
        delivery.deliveries = [...body.deliveries];
        delivery._id = body._id || delivery._id;
        delivery.deliveryMan_phonenumber = body.deliveryMan_phonenumber || delivery.deliveryMan_phonenumber;

        const updatedDelivery = await delivery.save();
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

export { setDelivery, updateDeliveryWithPhonenumber }