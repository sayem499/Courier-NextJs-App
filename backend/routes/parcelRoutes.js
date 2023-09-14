import express from 'express';
import { setUserParcel, getUserParcels } from '../controllers/parcelController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/create_new').post(protect, setUserParcel)
router.route('/get_all').get(protect, getUserParcels);

export default router; 