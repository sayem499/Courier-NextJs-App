import expressAsyncHandler from 'express-async-handler';
import { ParcelStatus } from '../models/parcelStatusModel.js';




//@desc Set parcel status
//@desc POST /api/parcelStatus/set
//@access Private
const setParcelStatus = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.create({
        _id: body._id,
        parcelStatus: body.parcelStatus,
        parcel_id: body.parcel_id,
    });

    if(parcelStatus) {
        res.status(201).json({
            message: 'Parcel status created successfully!',
        });
    }else {
        res.status(400)
        throw new Error('Invalid parcel status data!');
    }
}) 


export { setParcelStatus, }