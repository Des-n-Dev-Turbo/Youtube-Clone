import axios from 'axios';

export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;

const request = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const requestWithoutKey = axios.create({
  baseURL: BASE_URL,
});

export default request;
