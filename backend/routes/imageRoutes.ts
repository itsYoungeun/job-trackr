import express from 'express';
import { deleteImage } from '../controllers/imageController';

const router = express.Router();
router.post('/delete', deleteImage);

export default router;
