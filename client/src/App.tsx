import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

function App() {
  const { auth } = useAuth();
  return (
    <>
      {auth ? (
        <div className="w-screen h-screen flex justify-center items-start">
          <HomePage />
        </div>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;
