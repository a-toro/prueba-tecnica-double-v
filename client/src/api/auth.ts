import { API_BASE_URL, JWT_ACCESS_TOKEN } from "../lib/constants";

export function setAccessToken(token: string) {
  localStorage.setItem(JWT_ACCESS_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(JWT_ACCESS_TOKEN);
}

export function removeAccessToken() {
  localStorage.removeItem(JWT_ACCESS_TOKEN);
}

export async function login(email: string, password: string) {
  const url = `${API_BASE_URL}/auth/login`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(url, params);
  const result = await response.json();

  if (response.status !== 200) throw result;

  return result;
}
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const url = `${API_BASE_URL}/auth/register`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  };

  const response = await fetch(url, params);

  if (response.status !== 204) throw response;
}
