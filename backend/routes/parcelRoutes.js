import express from 'express';
import { setUserParcel, getUserParcels, getParcelsWithIds, updateParcelWithId, getUserParcelWithId, getUserParcelWithAdminLocationForPickup, getUserParcelWithAdminLocationForDelivery, getUserParcelWithTrackerId } from '../controllers/parcelController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
 
const router = express.Router();

router.route('/create_new').post(protect, setUserParcel)
router.route('/get_all').post(protect, getUserParcels);
router.route('/get_all').post(protectAdmin, getUserParcels);
router.route('/update').put(protectAdmin, updateParcelWithId);
router.route('/get_with_id').post(protectAdmin, getUserParcelWithId);
router.route('/get_with_ids_admin').post(protectAdmin, getParcelsWithIds);
router.route('/get_with_ids').post(protect, getParcelsWithIds);
router.route('/get_with_tracker_id').post(protect, getUserParcelWithTrackerId)
router.route('/get_with_location_pickup').post(protectAdmin, getUserParcelWithAdminLocationForPickup);
router.route('/get_with_location_delivery').post (protectAdmin, getUserParcelWithAdminLocationForDelivery);


export default router; 