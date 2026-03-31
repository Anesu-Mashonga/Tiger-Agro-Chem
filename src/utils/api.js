const DEFAULT_API_BASE_URL = "http://127.0.0.1:1337";

const normalizeBaseUrl = (value) => {
  const raw = value?.toString().trim();
  if (!raw) return DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$|\/$/, "");
};

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const API_HOST = API_BASE_URL.replace(/\/api$/, "");

export const buildApiUrl = (resource) => {
  const path = resource?.toString().trim().replace(/^\/+/, "") || "";
  return API_BASE_URL.includes("/api")
    ? `${API_BASE_URL}/${path}`
    : `${API_BASE_URL}/api/${path}`;
};
