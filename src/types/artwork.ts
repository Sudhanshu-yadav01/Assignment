



//title, place_of_origin, artist_display, inscriptions, date_start, date_end


export interface Artwork {
  id: number; 
  title: string; 
  place_of_origin: string; 
  artist_display: string; 
  inscriptions: string; 
  date_start: number; 
  date_end: number; 
   
}

/**
 * API response structure from the API
 */
export interface ArtworkResponse {
  data: Artwork[]; 
  pagination: {
    total: number; // Total number of artworks available
    limit: number; // Number of items per page
    offset: number; // Current offset
    total_pages: number; // Total number of pages
    current_page: number; // Current page number
  };
  
}


export interface DataTableLazyParams {
  first: number; // Index of first record to load
  rows: number; // Number of rows to load
  page?: number; // Current page number
  
}
