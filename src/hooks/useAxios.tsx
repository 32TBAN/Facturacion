import { baseUrl } from '#constants/urlBase'
import { useState, useEffect, useRef, useCallback } from "react";
import axios, { AxiosError } from "axios";

export default function useAxios<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cache = useRef<Record<string, T>>({});

  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      if (cache.current[url]) {
        setData(cache.current[url]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get<T>(url, { signal });

        if (typeof response.data === "string" && response.data.includes("<!doctype html>")) {
          throw new Error("Se recibió HTML en vez de JSON.");
        }

        cache.current[url] = response.data;
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          const axiosError = err as AxiosError;
          setError(
            axiosError.response?.data
              ? JSON.stringify(axiosError.response.data)
              : axiosError.message || "Error al cargar los datos"
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, error, isLoading };
}
export const useUsers = () => useAxios(`${baseUrl}/users`)
export const useCustomers = () => useAxios(`${baseUrl}/customers`)


