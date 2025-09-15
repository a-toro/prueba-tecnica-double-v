import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function useFetch<T>(
  url: string,
  body?: unknown,
  method: HttpMethod = "GET"
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reload, setReload] = useState(false);

  const { auth, logout } = useAuth();

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async function () {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          body: JSON.stringify(body),
        });

        if (response.status === 403) {
          logout();
        }

        const respData = await response.json();

        setData(respData);
      } catch (error) {
        console.log({ error });
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return controller.abort();
  }, [url, reload]);

  return {
    isError,
    isLoading,
    data,
    onReload,
  };
}
