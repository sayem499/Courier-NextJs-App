import mongoose from 'mongoose';

const parcelStatusSchema = mongoose.Schema({
    _id: {type: String, required: true},
    parcelStatus: {type: [String], required: true},
    parcel_id: {type: String, required: true},
    stepAction: {type: Number, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    sender_id: {type: String, required: true},
    deliveryCost: {type: Number, required: true},
    isReturned: {type: Boolean, required: true},
    deliveryMan_phonenumber: {type: String,},
    isPicked: {type:Boolean, required: true, default: false},
    isPickupAssigned: {type: Boolean, required: true, default: false},
    isDeliveryAssigned: {type: Boolean, required: true, default: false},
},{
    timestamps: true,
})


export const ParcelStatus = mongoose.model('ParcelStatus', parcelStatusSchema);

