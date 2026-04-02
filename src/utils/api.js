const DEFAULT_API_BASE_URL = "http://127.0.0.1:1337";

const normalizeBaseUrl = (value) => {
  const raw = value?.toString().trim();
  if (!raw) return DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$|\/$/, "");
};

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const API_HOST = API_BASE_URL.replace(/\/api$/, "");

export const normalizeMediaUrl = (media) => {
  if (!media) return "";
  if (typeof media === "string") return media;

  let asset = Array.isArray(media) ? media[0] : media;
  if (asset?.data) {
    asset = Array.isArray(asset.data) ? asset.data[0] : asset.data;
  }

  const attrs = asset?.attributes || asset;
  const url =
    attrs?.url ||
    attrs?.data?.url ||
    attrs?.formats?.large?.url ||
    attrs?.formats?.medium?.url ||
    attrs?.formats?.small?.url ||
    attrs?.formats?.thumbnail?.url;

  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  return url.startsWith("http") ? url : `${API_HOST}${url}`;
};

export const buildApiUrl = (resource) => {
  const path = resource?.toString().trim().replace(/^\/+/, "") || "";
  return API_BASE_URL.includes("/api")
    ? `${API_BASE_URL}/${path}`
    : `${API_BASE_URL}/api/${path}`;
};
