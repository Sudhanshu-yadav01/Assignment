import type {ArtworkResponse} from "../types/artwork";

// Base URL for  API
const API_BASE_URL = "https://api.artic.edu/api/v1";


export const artworkService = {
  
  async getArtworks(
    page: number = 1,
    limit: number = 10
  ): Promise<ArtworkResponse> {
    try {
      // Construct API URL with pagination and field selection
      const apiUrl = `${API_BASE_URL}/artworks?page=${page}&limit=${limit}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end,image_id`;

      console.log(`Fetching artworks from page ${page} with limit ${limit}`);//in console

      const response = await fetch(apiUrl);

      // Check if the request was successful or error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ArtworkResponse = await response.json();
      console.log(`Successfully fetched ${data.data.length} artworks`);// if successful

      return data;
    } catch (error) {
      console.error("Error fetching artworks:", error);
      throw error; 
    }
  },
};
