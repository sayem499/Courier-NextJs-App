import express from 'express';
import { setDeliveryMan, authDeliveryMan, logoutDelieryMan } from '../controllers/deliveryManController.js';
import { protectAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/set_deliveryman').post(protectAdmin, setDeliveryMan);
router.post('/auth_deliveryman', authDeliveryMan);
router.route('/logout_deliveryman').post(protect, logoutDelieryMan);

export default router;