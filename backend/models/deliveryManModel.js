import mongoose from 'mongoose';

const deliveryManSchema = mongoose.Schema({
    _id: {type: String, required: true},
    deliveryMan_username: {type: String, required: true},
    deliveryMan_phonenumber: {type: String, required: true},
    deliveryMan_email: {type: String, required: true},
    deliveryMan_password: {type: String, required: true},
    deliveryMan_image: {type: String, default: null},
},{
    timeStamps: true,
})

const DeliveryMans = mongoose.model('DeliveryMans', deliveryManSchema);
export default DeliveryMans; 