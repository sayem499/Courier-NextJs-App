import express from 'express';
import { setParcelStatus, getParcelStatusWithId, getParcelStatusWithParcelId, updateParcelStatusWithId, getParcelStatusWithStepAction, getParcelStatusWithSenderId, getParcelStatusesWithIds } from '../controllers/parcelStatusContoller.js';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/set').post(protect, setParcelStatus);
router.route('/get_with_step_action_admin').post(protectAdmin, getParcelStatusWithStepAction);
router.route('/get_with_step_action').post(protect, getParcelStatusWithStepAction);
router.route('/get_with_id').post(getParcelStatusWithId);
router.route('/get_with_ids_admin').post(protectAdmin, getParcelStatusesWithIds);
router.route('/get_with_ids').post(protect, getParcelStatusesWithIds);
router.route('/get_with_parcel_id').post(protect, getParcelStatusWithParcelId);
router.route('/update').put(protect, updateParcelStatusWithId);
router.route('/update_admin').put(protectAdmin, updateParcelStatusWithId);
router.route('/get_with_sender_id').post(protect, getParcelStatusWithSenderId);

export default router;