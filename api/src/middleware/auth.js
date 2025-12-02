import { verifyAccessToken } from "../utils/jwt.js";

export function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken; // lukee tokenit headereitten sijasta


  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired access token" });
  }

  req.user = decoded;

  if (
    req.baseUrl.startsWith("/user") &&
    req.params.id !== undefined && 
    Number(req.user.id) !== Number(req.params.id)
  ) {
    return res.status(403).json({ error:"Unauthorized" });
  }
  next();
}
