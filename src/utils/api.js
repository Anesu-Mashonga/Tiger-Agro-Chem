import { CMS_WP_API_BASE_URL } from "../config/cms";

const DEFAULT_API_BASE_URL = CMS_WP_API_BASE_URL;

const normalizeBaseUrl = (value) => {
  const raw = value?.toString().trim();
  if (!raw) return DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$|\/$/, "");
};

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const API_HOST = API_BASE_URL
  .replace(/\/wp-json\/wp\/v2\/?$/, "")
  .replace(/\/api\/?$/, "");

export const normalizeMediaUrl = (media) => {
  if (!media) return "";
  if (typeof media === "string") {
    if (media.startsWith("//")) return `https:${media}`;
    if (media.startsWith("http")) return media;
    if (media.startsWith("/")) return `${API_HOST}${media}`;
    return media;
  }

  let asset = Array.isArray(media) ? media[0] : media;
  if (asset?.data) {
    asset = Array.isArray(asset.data) ? asset.data[0] : asset.data;
  }

  const attrs = asset?.attributes || asset;
  const url =
    asset?.source_url ||
    attrs?.url ||
    attrs?.data?.url ||
    attrs?.sizes?.large ||
    attrs?.sizes?.medium ||
    attrs?.sizes?.thumbnail ||
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
  if (!path) return API_BASE_URL;

  const base = API_BASE_URL.replace(/\/+$/, "");
  if (/\/wp-json\/wp\/v2$/i.test(base) || /\/api$/i.test(base)) {
    return `${base}/${path}`;
  }
  if (/\/wp-json\//i.test(base)) {
    return `${base}/${path}`;
  }
  return `${base}/wp-json/wp/v2/${path}`;
};
