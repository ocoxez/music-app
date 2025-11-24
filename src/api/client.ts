import { ApiResponse, Show } from '../types';

const BASE_URL = 'https://phish.in/api/v2';

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  const json = await response.json();
  return json; 
}

export const api = {
  getRecentShows: (page = 1, perPage = 20) => 
    request<ApiResponse<Show[]>>(`/shows?page=${page}&per_page=${perPage}&sort_attr=date&sort_dir=desc`),
  
  getShow: (id: number) => 
    request<ApiResponse<Show>>(`/shows/${id}`)
};