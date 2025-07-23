import express from 'express';
import { updateSetting, getSetting } from '../controller/settingController.js';
const router = express.Router();

router.put('/', updateSetting);
router.get('/', getSetting);

export default router; 