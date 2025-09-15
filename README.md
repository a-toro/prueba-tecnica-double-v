# Proyecto Full-Stack (Express + React + TypeScrip + PostgresSQL - Redis)

Este proyecto es una aplicación **full-stack** compuesta por:

- **Backend**: Node.js + Express + TypeScript + PostgreSQL
- **Frontend**: React + TypeScript + Vite + TailwindCSS

---

## 📦 Requisitos previos

- **Node.js** ≥ 18
- **npm** ≥ 9
- **PostgreSQL** instalado y corriendo
- **Redis** instalado y corriendo

---

## 🚀 Backend

### Tecnologías

- **Express** con **TypeScript**
- **pg** (pool de conexiones) para consultas a PostgreSQL
- **Redis** para el almacenamiento en cache de consulta de deudas por usuario.
- Patrón **Repository** para la organización de la capa de datos
- Configuración de **CORS** para permitir peticiones desde el frontend

### Configuración

1. Clona el repositorio y entra en la carpeta del backend.
   ```bash
   cd server
   ```
2. Copia el archivo de variables de entorno `.env.example` o crea un `.env` con al menos:
   ```env
    API_PORT=5000
    API_ROOT="/api"
    JWT_ACCESS_TOKEN_SECRET= "yout_jwt_access_token"
    SALT_ROUNDS= 10
    PG_HOST="localhost"
    PG_PORT="5432",
    PG_USER="you-user"
    PG_PASSWORD="your-password"
    PG_DATABASE="your-db-name"
    REDIS_URL="redis://localhost:6379"
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Crea la base de datos:
   - En la carpeta **`/server/sql/debt-app`** hay un archivo SQL con los comandos necesarios para crear las tablas, copialo y pegalo en un script de la base de datos y dale en correr.
5. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Notas

- Si cambias la URL del frontend, recuerda **agregarla a la lista blanca de CORS** en `server/config/cors.ts`.

---

## 💻 Frontend

### Tecnologías

- **React** + **TypeScript** + **Vite**
- **TailwindCSS** para el diseño
- Autenticación simple usando **React Context**

### Configuración

1. Desde la raíz del proyecto, entra en la carpeta del frontend:
   ```bash
   cd client
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Configura la URL base de la API en:
   ```
   src/lib/constants.ts
   ```
   ```ts
   export const API_BASE_URL = "http://localhost:5000/api";
   ```
4. Ejecuta el entorno de desarrollo:
   ```bash
   npm run dev
   ```

## ✨ Características principales

- **Componentes reutilizables** en el frontend para inputs, botones y modales.
- **API REST** organizada con un patrón Repository, consultas a PostgreSQL con pool de conexiones para mayor disponibilidad.
- **Autenticación** y manejo de sesión a través de React Context.

---

## ⚡ Decisiones técnicas

- **Node.js + Express + TypeScript**: rapidez de desarrollo, tipado y ecosistema maduro.
- **PostgreSQL**: base de datos relacional robusta y confiable.
- **React + Vite + TailwindCSS**: experiencia de desarrollo ágil, hot reload rápido y diseño consistente.

---
