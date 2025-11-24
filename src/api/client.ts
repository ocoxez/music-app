import { ShowsResponse, Show, ApiResponse } from '../types';

const BASE_URL = 'https://phish.in/api/v2';

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  getRecentShows: (page = 1, perPage = 20) => 
    request<ShowsResponse>(`/shows?page=${page}&per_page=${perPage}&sort_attr=date&sort_dir=desc`),
  
  getShow: (idOrDate: string | number) => 
    request<any>(`/shows/${idOrDate}`)
};