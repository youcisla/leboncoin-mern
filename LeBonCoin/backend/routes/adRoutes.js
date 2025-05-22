import express from 'express';
import multer from 'multer';
import path from 'path';
import { createAd, getAllAds } from '../controllers/adController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', getAllAds);
router.post('/', authMiddleware, upload.single('file'), createAd);

export default router;
