import axios from "axios";
import { API_URL } from "./env_variables";

export async function deleteUserRole(ROLE_ID: number) {
  try {
    const apiUrl = `${API_URL}/user-roles/${ROLE_ID}`;
    const response = await axios.delete(apiUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserState(STATE_ID: number) {
  try {
    const apiUrl = `${API_URL}/user-states/${STATE_ID}`;
    const response = await axios.delete(apiUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCountry(COUNTRY_ID: number) {
  try {
    const apiUrl = `${API_URL}/countries/${COUNTRY_ID}`;
    const response = await axios.delete(apiUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCity(CITY_ID: number) {
  try {
    const apiUrl = `${API_URL}/cities/${CITY_ID}`;
    const response = await axios.delete(apiUrl);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
