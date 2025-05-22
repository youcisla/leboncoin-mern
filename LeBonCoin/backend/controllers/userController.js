import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Ad from "../models/adModel.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({
      _id: user._id,
      email: user.email,
      username: user.username
    });
  } catch (error) {
    if (error.code === 11000 && error.keyValue?.email) {
      return res.status(400).send({ error: "Cet email est déjà utilisé." });
    }
    res.status(400).send({ error: "Erreur lors de l'inscription" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({
      message: "Connexion réussie",
      token,
      username: user.username
    });

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    let updates = req.body;

    updates = Object.fromEntries(
      Object.entries(updates).filter(([key, value]) => value !== "")
    );

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
};

export const getUserAds = async (req, res) => {
  try {
    const userAds = await Ad.find({ author: req.userId });
    res.status(200).json(userAds);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des annonces utilisateur" });
  }
};
