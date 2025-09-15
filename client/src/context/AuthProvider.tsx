import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getAccessToken, removeAccessToken } from "../api/auth";

export interface AuthState {
  user?: {
    id: string;
    username: string;
    // name: string;
    // email: string;
  };
  accessToken?: string | null;
}
interface AuthContextType {
  auth: AuthState | null;
  setAuth: Dispatch<SetStateAction<AuthState | null>>;
  logout: () => void;
  // loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();

    setAuth((prev) => ({ ...prev, accessToken }));
  }, []);

  const logout = function () {
    removeAccessToken();
    setAuth(null);
  };

  const authValue = useMemo(
    () => ({
      auth,
      setAuth,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
