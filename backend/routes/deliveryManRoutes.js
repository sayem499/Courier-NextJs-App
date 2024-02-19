import express from 'express';
import { setDeliveryMan, authDeliveryMan, updateDelievryman, logoutDelieryMan, getDeliverymanWithPhonenumber } from '../controllers/deliveryManController.js';
import { protectAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/set_deliveryman').post(protectAdmin, setDeliveryMan);
router.post('/auth_deliveryman', authDeliveryMan);
router.route('/update_deliveryman').put(protectAdmin, updateDelievryman);
router.route('/get_with_phonenumber_admin').post(protectAdmin, getDeliverymanWithPhonenumber);
router.route('/logout_deliveryman').post(protect, logoutDelieryMan);

export default router;