import mongoose from 'mongoose';

const parcelStatusSchema = mongoose.Schema({
    _id: {type: String, required: true},
    parcelStatus: {type: [String], required: true},
    parcel_id: {type: String, required: true},
    stepAction: {type: Number, required: true},
},{
    timestamps: true,
})


export const ParcelStatus = mongoose.model('ParcelStatus', parcelStatusSchema);

