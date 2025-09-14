import express from "express";
import { authRoutes } from "./auth/auth-routes";

export const app = express();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("", (req, res) => {
  res.send("Hello app");
});
