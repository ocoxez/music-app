export interface Track {
  id: number;
  title: string;
  position: number;
  duration: number;
  mp3: string;
  slug: string;
  set: string;
  likes_count: number;
}

export interface Venue {
  id: number;
  name: string;
  location: string;
}

export interface Show {
  id: number;
  date: string;
  venue_name?: string;
  venue?: Venue;
  location: string;
  duration: number;
  tracks: Track[];
  tags: string[];
}

export interface ShowsResponse {
  current_page: number;
  total_entries: number;
  total_pages: number;
  shows: Show[]; 
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}