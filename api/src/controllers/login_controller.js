import {authenticateUser, saveRefreshToken,getUserByRefreshToken,clearRefreshToken} from "../models/login_model.js"

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";



export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Luo tokenit
    const accessToken = generateAccessToken(user.username);
    const refreshToken = generateRefreshToken(user.username);

    // Tallenna refresh token tietokantaan
    await saveRefreshToken(user.username, refreshToken);

    // Aseta refresh token HTTP-only cookieen
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Ei JavaScript-pääsyä
      secure: process.env.NODE_ENV === "production", // HTTPS tuotannossa
      sameSite: "strict", // CSRF-suojaus
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 päivää
    });

    res.json({
      message: "Login successful",
      username: user.username,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}


export async function refreshAccessToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    // Validoi refresh token
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res
        .status(403)
        .json({ error: "Invalid or expired refresh token" });
    }

    // Tarkista että token on tietokannassa
    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Luo uusi access token
    const accessToken = generateAccessToken(user.username);

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
}

// Kirjaudu ulos
export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await getUserByRefreshToken(refreshToken);

      if (user) {
        // Poista refresh token tietokannasta
        await clearRefreshToken(user.username);
      }
    }

    // Poista cookie
    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
}

