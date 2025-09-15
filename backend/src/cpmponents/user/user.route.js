import express from "express";
import { login, logout, register, updateProfile } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/register-user", register);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.put("/update-profile", updateProfile);

export default userRouter;
