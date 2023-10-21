import express from 'express';
import { setUserParcel, getUserParcels, updateParcelWithId, getUserParcelWithId } from '../controllers/parcelController.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
 
const router = express.Router();

router.route('/create_new').post(protect, setUserParcel)
router.route('/get_all').post(protect, getUserParcels);
router.route('/update').put(protectAdmin, updateParcelWithId);
router.route('/get_with_id').post(protectAdmin, getUserParcelWithId);


export default router; 