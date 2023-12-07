import asyncHandler from "express-async-handler";
import { Parcel } from "../models/parcelModel.js";



//@dec Set user parcel
//@routes POST /api/parcel/create_new
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
        tracker_id: body.tracker_id,
        parcelPrice: body.parcelPrice,
        courierType: body.courierType,
        cashCollectionAmount: body.cashCollectionAmount,
        deliveryCost: body.deliveryCost,
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


//@dec Get user parcel with admin location for pickup
//@route POST /api/parcel/get_with_location_pickup
//@access Private

const getUserParcelWithAdminLocationForPickup = asyncHandler(async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.find({senderDivision: body.admin_location});
    if(userParcel){
        res.status(201).json(userParcel);
    } else {
        res.status(400);
        throw new Error('No parcel found for current user');
    }

})


//@dec Get user parcel with admin location for delivery
//@route POST /api/parcel/get_with_location_delivery
//@access Private

const getUserParcelWithAdminLocationForDelivery = asyncHandler(async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.find({division: body.admin_location});
    if(userParcel){
        res.status(201).json(userParcel);
    } else {
        res.status(400);
        throw new Error('No parcel found for current user');
    }

})


//@dec Get user parcel
//@route POST /api/parcel/get_all
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



//@dec Get user parcel with parcel ID.
//@route POST /api/parcel/get_with_id
//@access Private
const getUserParcelWithId = asyncHandler (async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.find({_id: body._id});

    if(userParcel){
        res.status(201).json(userParcel);
    }else{
        res.status(400);
        throw new Error('Invalid parcel data.');
    }
}) 


//@dec Update user parcel
//@route PUT /api/parcel/update
//access Private
const updateParcelWithId = asyncHandler (async (req, res) => {
    const body = req.body;
    const userParcel = await Parcel.findById(body._id);
    
    if(userParcel){
        userParcel._id = body._id || userParcel._id;
        userParcel.sender_id = body.sender_id || userParcel.sender_id;
        userParcel.receiverName = body.receiverName || userParcel.receiverName;
        userParcel.receiverPhonenumber = body.receiverPhonenumber || userParcel.receiverPhonenumber;
        userParcel.address = body.address || userParcel.address;
        userParcel.division = body.division || userParcel.division;
        userParcel.district = body.district || userParcel.district;
        userParcel.upazila = body.upazila || userParcel.upazila;
        userParcel.postcode = body.postcode || userParcel.postcode;
        userParcel.senderName = body.senderName || userParcel.senderName;
        userParcel.senderPhonenumber = body.senderPhonenumber || userParcel.senderPhonenumber;
        userParcel.senderAddress = body.senderAddress || userParcel.senderAddress;
        userParcel.senderDivision = body.senderDivision || userParcel.senderDivision;
        userParcel.senderDistrict = body.senderDistrict || userParcel.senderDistrict;
        userParcel.senderUpazila = body.senderUpazila || userParcel.senderUpazila;
        userParcel.senderPostcode = body.senderPostcode || userParcel.senderPostcode;
        userParcel.parcelWeight = body.parcelWeight || userParcel.parcelWeight;
        userParcel.parcelType = body.parcelType || userParcel.parcelType;
        userParcel.tracker_id = body.tracker_id || userParcel.tracker_id;
        userParcel.parcelPrice = body.parcelPrice || userParcel.parcelPrice;
        userParcel.courierType = body.courierType || userParcel.courierType;
        userParcel.cashCollectionAmount = body.cashCollectionAmount || userParcel.cashCollectionAmount;
        userParcel.deliveryCost = body.deliveryCost || userParcel.deliveryCost;
        
        const updatedParcel = await userParcel.save();
        if(updatedParcel){
            res.status(200).json(updatedParcel);
        }else {
            res.status(500);
            throw new Error('Internal server error.');
        }

    } else {
        res.status(400);
        throw new Error('Invalid parcel data.');
    }
});



export {setUserParcel, getUserParcels, updateParcelWithId, getUserParcelWithId, getUserParcelWithAdminLocationForPickup, getUserParcelWithAdminLocationForDelivery};