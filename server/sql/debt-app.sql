-- Activar extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "username" VARCHAR(100) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT now()
);

-- Crear ENUM para el estado de deudas
CREATE TYPE "DebtStatus" AS ENUM ('pending', 'paid');

-- Tabla de deudas
CREATE TABLE "debts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "friendName" VARCHAR(100) NOT NULL,
  "value" DECIMAL(10,2) NOT NULL,
  "status" "DebtStatus" DEFAULT 'pending',
  "createdAt" TIMESTAMP DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "users" ("id")
);