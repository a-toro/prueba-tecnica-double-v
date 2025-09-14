import express from "express";
import { registerDebt } from "./debt-controller";

// Rutas para las deudas
export const debtsRoutes = express.Router();

// Crear nueva deuda
debtsRoutes.post("", registerDebt);
