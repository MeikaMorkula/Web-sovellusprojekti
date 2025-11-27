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

  //const Identity = req.params.id;

  //muutetaan molemmat stringeiksi vertailua varten
  /* ei tarvita enään?
  if (String(req.user.id) !== String(Identity)) {
    return res.status(403).json({ error:"Unauthorized" });
  }*/

  next();
}
