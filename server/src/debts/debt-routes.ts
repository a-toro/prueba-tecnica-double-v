import express from "express";
import { getDebtByIdController, registerDebt } from "./debt-controller";

// Rutas para las deudas
export const debtsRoutes = express.Router();

// Crear nueva deuda
debtsRoutes.post("", registerDebt);

debtsRoutes.get("/:id", getDebtByIdController);

