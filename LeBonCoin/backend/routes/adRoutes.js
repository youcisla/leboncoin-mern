import express from 'express';
import multer from 'multer';
import path from 'path';
import { createAd, deleteAd, getAllAds, getAllAdsForAllUsers, updateAd } from '../controllers/adController.js';
import { getUserAds } from '../controllers/userController.js';
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

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get('/', authMiddleware, getAllAds);
router.get('/all', getAllAdsForAllUsers);
router.get('/user', authMiddleware, getUserAds);
router.post('/', authMiddleware, upload.single('file'), createAd);
router.put('/:id', authMiddleware, upload.single('file'), updateAd);
router.delete('/:id', authMiddleware, deleteAd);

export default router;
