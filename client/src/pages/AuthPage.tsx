import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export default function AuthPage() {
  const [index, setIndex] = useState(0);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section>
        {index === 0 && <LoginForm />}
        {index === 1 && <RegisterForm />}
        <div className="text-center pt-3">
          {index == 0 ? (
            <button onClick={() => setIndex(1)}>
              <span className="text-sm underline text-blue-500">
                Registrarse
              </span>
            </button>
          ) : (
            <button onClick={() => setIndex(0)}>
              <span className="text-sm underline text-blue-500">
                Iniciar sesión
              </span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
