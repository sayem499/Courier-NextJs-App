import asyncHandler from "express-async-handler";
import Parcel from "../models/parcelModel.js";



//@dec Set user parcel
//@routes POST /api/parcel
//@access Private
const setUserParcel = asyncHandler ( async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.create({
        _id: body._id,
        sender_id: body.sender_id,
        receiverName: body.receiverName,
        receiverPhonenumber: body.receiverPhonenumber,
        address: body.address,
        division: body.division,
        district: body.district,
        upazila: body.upazila,
        postcode: body.postcode,
        senderName: body.senderName,
        senderPhonenumber: body.senderPhonenumber,
        senderAddress: body.senderAddress,
        senderDivision: body.senderDivision,
        senderDistrict: body.senderDistrict,
        senderUpazila: body.senderUpazila,
        senderPostcode: body.senderPostcode,
        parcelWeight: body.parcelWeight,
        parcelType: body.parcelType,
    }); 

    if(userParcel){
        res.status(201).json({
            message: 'Parcel created successfully.'
        });
    } else {
        res.status(400)
        throw new Error('Invalid parcel data.');
    }

})



//@dec Get user parcel
//@route POST /api/parcel
//@access Private
const getUserParcels = asyncHandler (async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.find({sender_id: body.sender_id});

    if(userParcel){
        res.status(201).json(userParcel);
    } else {
        res.status(400);
        throw new Error('No parcel found for current user');
    }
});



export {setUserParcel, getUserParcels};