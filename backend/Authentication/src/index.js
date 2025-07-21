import express from "express";
import bodyParser from "body-parser";
import { db } from "./database/index.js";
import { userRouter } from "./route/index.js";
import { authRouter } from "./route/index.js";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/token-middleware.js";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import cors from "cors";
import { testimonialRouter } from "./route/index.js";
import { menuRouter } from "./route/index.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

// Serve uploads publicly
app.use('/uploads', express.static('uploads'));

app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/file", router);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/menu", menuRouter);
createUploadsFolder();
app.listen(4000, function () {
  console.log("project running in port ", port);
  db();
});
