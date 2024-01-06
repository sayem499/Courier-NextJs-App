import mongoose from 'mongoose';

const deliverySchema = mongoose.Schema({
    _id: { type: String, required: true },
    deliveryMan_phonenumber: {type: String, required: true },
    deliveries: { type: [String] },
    pickups: {type: [String] }
})

const Deliveries = mongoose.model('Deliveries', deliverySchema);
export default Deliveries  