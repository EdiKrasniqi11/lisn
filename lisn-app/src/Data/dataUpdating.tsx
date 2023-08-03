import axios from "axios";
import { API_URL } from "./env_variables";
import { CITY, COUNTRY, USER_ROLE, USER_STATE } from "./Interfaces";

export async function updateUserRole(entity: USER_ROLE) {
  try {
    const apiUrl = `${API_URL}/user-roles`;

    const response = await axios.put(apiUrl, entity);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserState(entity: USER_STATE) {
  try {
    const apiUrl = `${API_URL}/user-states`;

    const response = await axios.put(apiUrl, entity);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCountry(entity: COUNTRY) {
  try {
    const apiUrl = `${API_URL}/countries`;

    const response = await axios.put(apiUrl, entity);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCity(entity: CITY) {
  try {
    const apiUrl = `${API_URL}/cities`;

    const response = await axios.put(apiUrl, entity);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
