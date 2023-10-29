import expressAsyncHandler from 'express-async-handler';
import { ParcelStatus } from '../models/parcelStatusModel.js';




//@desc Set parcel status
//@route POST /api/parcelStatus/set
//@access Private
const setParcelStatus = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.create({
        _id: body._id,
        parcelStatus: body.parcelStatus,
        parcel_id: body.parcel_id,
        stepAction: body.stepAction,
        isPaid: body.isPaid,
        sender_id: body.sender_id,
        deliveryCost: body.deliveryCost,
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

//@desc Get parcel status with step action
//@route POST /api/parcelStatus/get_with_step_action
//@access Private

const getParcelStatusWithStepAction = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.find({ stepAction: body.stepAction });
    if(parcelStatus) {
        res.status(201).json(parcelStatus);    
    } else {
        res.status(400)
        throw new Error('Invalid parcel status data.');
    }
})

//@desc Get parcel status with tracker id
//@route POST /api/parcelStatus/get_with_id
//@access Public

const getParcelStatusWithId = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.findById(body._id);
    if(parcelStatus) {
        res.status(201).json(parcelStatus);    
    } else {
        res.status(400)
        throw new Error('Invalid parcel status data.');
    }
})


//@desc Get parcel status with parcel id
//@route POST /api/parcelStatus/get_with_parcel_id
//@access Private

const getParcelStatusWithParcelId = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.find({parcel_id: body.parcel_id});
    if(parcelStatus) {
        res.status(201).json(parcelStatus);    
    } else {
        res.status(400)
        throw new Error('Invalid parcel status data.');
    }
})


//@desc Get parcel status with sender id
//@route POST /api/parcelStatus/get_with_sender_id
//@access Private

const getParcelStatusWithSenderId = expressAsyncHandler( async (req, res) => {
    const body = req.body;
    const parcelStatus = await ParcelStatus.find({sender_id: body.sender_id});
    if(parcelStatus) {
        res.status(201).json(parcelStatus);    
    } else {
        res.status(400)
        throw new Error('Invalid parcel status data.');
    }
})


//@desc Update parcel status with tracker id
//@route PUT /api/parcelStatus/update
//@access Private

const updateParcelStatusWithId = expressAsyncHandler( async (req, res) => {
   const  body = req.body;
   const parcelStatus = await ParcelStatus.findById(body._id);
   if(parcelStatus){
        (body.parcelStatus && parcelStatus.parcelStatus.push(body.parcelStatus)); 
        parcelStatus.parcel_id = body.parcel_id || parcelStatus.parcel_id;
        parcelStatus.stepAction = body.stepAction || parcelStatus.stepAction;
        parcelStatus.isPaid = body.isPaid || parcelStatus.isPaid;
        parcelStatus.sender_id = body.sender_id || parcelStatus.sender_id;
        parcelStatus.deliveryCost = body.deliiveryCost || parcelStatus.deliveryCost;

        
        const updatedParcelStatus = await parcelStatus.save();
        if(updatedParcelStatus){
            res.status(200).json({
               parcelStatus: updatedParcelStatus.parcelStatus,
               parcel_id: updatedParcelStatus.parcel_id,
               stepAction: updatedParcelStatus.stepAction,
               isPaid: updatedParcelStatus.isPaid,
               sender_id: updatedParcelStatus.sender_id,
               deliveryCost: updatedParcelStatus.deliiveryCost,
            });
        }else {
            res.status(500);
            throw new Error('Internal server error.')
        }
    } else {
        res.status(400)
        throw new Error('Invalid parcel status data.')
    }
})



export { setParcelStatus, getParcelStatusWithStepAction, getParcelStatusWithId, getParcelStatusWithParcelId, getParcelStatusWithSenderId, updateParcelStatusWithId }