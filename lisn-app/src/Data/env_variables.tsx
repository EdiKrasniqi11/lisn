export const API_URL = "http://localhost:5005/api";

export const SONG_API_URL = "http://localhost:5006/api";

export const IMAGE_URL = (IMAGE_PATH: string) => {
  return `${API_URL}/images/${IMAGE_PATH}`;
};
