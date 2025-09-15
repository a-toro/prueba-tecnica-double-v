import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider
      autoHideDuration={5000}
      maxSnack={5}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      action={(snackbarId) => (
        <span
          className="bg-transparent text-white cursor-pointer text-sm"
          onClick={() => closeSnackbar(snackbarId)}
        >
          Cerrar
        </span>
      )}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>
);
