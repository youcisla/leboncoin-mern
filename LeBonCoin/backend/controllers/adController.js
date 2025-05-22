import Ad from '../models/adModel.js';

const createAd = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const userId = req.userId;

    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

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
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des annonces" });
  }
};

export { createAd, getAllAds };

