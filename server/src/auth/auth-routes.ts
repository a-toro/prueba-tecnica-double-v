import express from "express";
import { loginUser, registerUser } from "./auth-controller";

export const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
