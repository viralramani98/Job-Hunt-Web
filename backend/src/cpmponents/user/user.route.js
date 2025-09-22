import express from "express";
import { login, logout, register, updateProfile } from "./user.controller.js";
import { singleupload } from "../../middlewares/multer.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { upload } from "../../middlewares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", singleupload, register);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.put("/update-profile", isAuthenticated, upload.single("file"), updateProfile);

export default userRouter;
