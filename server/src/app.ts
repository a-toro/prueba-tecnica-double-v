import express from "express";
import cors from "cors";
import { authRoutes } from "./auth/auth-routes";
import { verifyJWT } from "./middlewares/verify-jwt";
import { debtsRoutes } from "./debts/debt-routes";
import { notFound } from "./middlewares/not-found";
import { handleError } from "./middlewares/handle-error";
import { credentials } from "./middlewares/credentials";
import { corsOptions } from "./config/cors";

export const app = express();

// Add middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// Rutas protegidas
app.use("/api/debts", verifyJWT, debtsRoutes);

app.get("", (req, res) => {
  res.send("Hello app");
});

// Not found
app.use(notFound);

// Handle error
app.use(handleError);
