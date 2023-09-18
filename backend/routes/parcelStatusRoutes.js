import express from 'express';
import { setParcelStatus } from '../controllers/parcelStatusContoller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/set').post(protect, setParcelStatus);

export default router;