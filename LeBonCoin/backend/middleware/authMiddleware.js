import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    console.log("Token received in Authorization header:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);
    if (!decoded._id) {
      console.error("Decoded token does not contain user ID:", decoded);
      return res.status(401).json({ error: "Token invalide: user ID missing" });
    }
    req.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};

export default authMiddleware;
