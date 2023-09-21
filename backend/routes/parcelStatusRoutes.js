import express from 'express';
import { setParcelStatus, getParcelStatusWithId, getParcelStatusWithParcelId, updateParcelStatusWithId } from '../controllers/parcelStatusContoller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/set').post(protect, setParcelStatus);
router.route('/get_with_id').post(getParcelStatusWithId);
router.route('/get_with_parcel_id').post(protect, getParcelStatusWithParcelId);
router.route('/update').put(protect, updateParcelStatusWithId);

export default router;