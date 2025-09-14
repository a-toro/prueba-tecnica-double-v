import { CorsOptions } from "cors";

export const whiteList = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
