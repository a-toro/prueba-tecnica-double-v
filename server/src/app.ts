import express from "express";
import cors from "cors";
import { authRoutes } from "./auth/auth-routes";
import { verifyJWT } from "./middlewares/verify-jwt";
import { debtsRoutes } from "./debts/debt-routes";

export const app = express();

// Add middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// Rutas protegidas
app.use(verifyJWT);

app.use("/api/debts", debtsRoutes);

app.get("", (req, res) => {
  res.send("Hello app");
});
