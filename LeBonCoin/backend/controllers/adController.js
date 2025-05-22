import Ad from '../models/adModel.js';

const createAd = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing. Please ensure you are authenticated." });
    }

    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mpeg", "video/quicktime"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Seuls les fichiers image et vidéo sont autorisés." });
      }
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
    console.error("Error in createAd:", error.stack);
    res.status(500).json({ error: "Erreur lors de la création de l'annonce", details: error.message });
  }
};

const getAllAds = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID from request:", userId);
    const ads = await Ad.find({ author: userId }).sort({ createdAt: -1 });
    console.log("Fetching ads for user:", userId);
    console.log("Ads fetched:", ads);
    console.log("Database query:", { author: userId });
    res.json(ads);
  } catch (error) {
    console.error("Error in getAllAds:", error.stack);
    res.status(500).json({ error: "Erreur lors de la récupération des annonces" });
  }
};

const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price } = req.body;
    const userId = req.userId;

    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ error: "Annonce introuvable" });
    }

    if (ad.author.toString() !== userId) {
      return res.status(403).json({ error: "Vous n'êtes pas l'auteur de cette annonce et ne pouvez pas la modifier." });
    }

    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.category = category || ad.category;
    ad.price = price || ad.price;

    if (req.file) {
      ad.fileUrl = `/uploads/${req.file.filename}`;
      ad.fileType = req.file.mimetype;
    }

    await ad.save();
    res.status(200).json(ad);
  } catch (error) {
    console.error("Error in updateAd:", error.stack);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'annonce", details: error.message });
  }
};

const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const ad = await Ad.findById(id);

    if (!ad) {
      return res.status(404).json({ error: "Annonce introuvable" });
    }

    if (ad.author.toString() !== userId) {
      return res.status(403).json({ error: "Non autorisé à supprimer cette annonce" });
    }

    await ad.remove();
    res.status(200).json({ message: "Annonce supprimée avec succès" });
  } catch (error) {
    console.error("Error in deleteAd:", error.stack);
    res.status(500).json({ error: "Erreur lors de la suppression de l'annonce", details: error.message });
  }
};

const getAllAdsForAllUsers = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de toutes les annonces" });
  }
};

export { createAd, deleteAd, getAllAds, getAllAdsForAllUsers, updateAd };

