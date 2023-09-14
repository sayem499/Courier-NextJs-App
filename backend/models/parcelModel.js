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


}, {
    timestamp: true,
});

const Parcel = mongoose.model('Parcel', parcelSchema);
export default Parcel;