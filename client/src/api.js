const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getApiUrl = (path = '') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
};

export const apiFetch = (path, options) => {
  return fetch(getApiUrl(path), options);
};