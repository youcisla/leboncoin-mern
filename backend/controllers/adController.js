import fs from 'fs';
import path from 'path';
import Ad from '../models/adModel.js';

const createAd = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const userId = req.user.id;

    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      fileType = req.file.mimetype;
    }

    const ad = new Ad({
      title,
      description,
      category,
      price,
      author: userId,
      fileUrl,
      fileType
    });

    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'annonce" });
  }
};

const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des annonces" });
  }
};

export { createAd, getAllAds };
