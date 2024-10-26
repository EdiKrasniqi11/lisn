import axios from "axios";
import { API_URL, SONG_API_URL } from "./env_variables";
import {
  COUNTRY,
  GENRE,
  SUBGENRE,
  USER,
  USER_ROLE,
  USER_STATE,
} from "./Interfaces";

export async function createUserRole(entity: USER_ROLE) {
  try {
    const apiUrl = `${API_URL}/user-roles`;

    const response = await axios.post(apiUrl, entity);

    return response.data;
  } catch (error: any) {
    alert(error?.response?.data?.message);
  }
}

export async function createUserState(entity: USER_STATE) {
  try {
    const apiUrl = `${API_URL}/user-states`;

    const response = await axios.post(apiUrl, entity);

    return response.data;
  } catch (error: any) {
    alert(error?.response?.data?.message);
  }
}

export async function createGenre(entity: GENRE) {
  try {
    const apiUrl = `${SONG_API_URL}/genres`;

    const response = await axios.post(apiUrl, entity);

    return response.data;
  } catch (error: any) {
    alert(error?.response?.data?.message);
  }
}

export async function createSubGenre(entity: SUBGENRE) {
  try {
    const apiUrl = `${SONG_API_URL}/sub-genres`;

    const response = await axios.post(apiUrl, entity);
    
    return response.data;
  } catch (error: any) {
    alert(error?.response?.data?.message);
  }
}

export async function registerUser(entity: USER) {
  try {
    const apiUrl = `${API_URL}/users`;
    const response = await axios.post(apiUrl, entity);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    alert(error?.response?.data?.message);
  }
}

export async function followUser(id: string) {
  try {
    const apiUrl = `${API_URL}/follow/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response = await axios.post(apiUrl, null, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
