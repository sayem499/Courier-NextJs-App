import express from 'express';
import { protect, protectAdmin } from '../middleware/authMiddleware.js';
import { setDelivery, updateDeliveryWithPhonenumber } from '../controllers/deliveryController.js';

const router = express.Router();

router.route('/set_delivery').post(protectAdmin, setDelivery);
router.route('/update_delivery').put(protect, updateDeliveryWithPhonenumber);
router.route('/update_delivery').put(protectAdmin, updateDeliveryWithPhonenumber);

export default router

