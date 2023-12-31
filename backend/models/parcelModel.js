import mongoose from 'mongoose';

const parcelSchema = mongoose.Schema({
    _id: {type: String, required: true},
    sender_id: {type: String, required: true},
    receiverName: {type: String, required: true},
    receiverPhonenumber: {type: String, required: true},
    address: {type: String, required: true},
    division: {type: String, },
    district: {type: String, },
    upazila: {type: String, },
    postcode: {type:String, },
    senderName: {type: String, required: true},
    senderPhonenumber: {type: String, required: true},
    senderAddress: {type: String, required: true},
    senderDivision: {type: String, },
    senderDistrict: {type: String,},
    senderUpazila: {type: String, },
    senderPostcode: {type: String, },
    parcelWeight: {type: Number, required: true},
    parcelType: {type: String, required: true},
    tracker_id: {type: String, required: true},
    parcelPrice: {type: Number, required: true},
    courierType: {type: String, required: true},
    cashCollectionAmount: {type: Number, required: true},
    deliveryCost: {type: Number, require: true},
}, {
    timestamps: true,
});

export const Parcel = mongoose.model('Parcel', parcelSchema);
