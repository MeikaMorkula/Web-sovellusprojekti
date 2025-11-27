import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";

import userRouter from "./routers/user_router.js";
import { authenticateToken } from "./middleware/auth.js";
import loginRouter from "./routers/login_router.js";
import favouriteRouter from "./routers/favourites_router.js";

const app = express();
const port = process.env.PORT;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  "/profile-pictures",
  express.static(path.join(__dirname, "..", "public", "profile-pictures"))
);

//app.use("/book", bookRouter);

app.use("", loginRouter);
app.use("/user", userRouter);
app.use("/favourite", favouriteRouter);

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
