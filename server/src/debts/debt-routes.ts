import express from "express";
import {
  deleteDebtController,
  getAllDebtByIdController,
  getDebtByIdController,
  registerDebt,
  updatetDebtController,
} from "./debt-controller";

// Rutas para las deudas
export const debtsRoutes = express.Router();

// Crear nueva deuda
debtsRoutes.post("", registerDebt);

debtsRoutes.get("/:id", getDebtByIdController);

debtsRoutes.get("", getAllDebtByIdController);

debtsRoutes.put("/:id", updatetDebtController);

debtsRoutes.delete("/:id", deleteDebtController);
