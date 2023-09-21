import axios from "axios";
import { API_URL } from "./env_variables";
import secureLocalStorage from "react-secure-storage";

export async function deleteUserRole(ROLE_ID: number) {
  try {
    const apiUrl = `${API_URL}/user-roles/${ROLE_ID}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserState(STATE_ID: number) {
  try {
    const apiUrl = `${API_URL}/user-states/${STATE_ID}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCountry(COUNTRY_ID: number) {
  try {
    const apiUrl = `${API_URL}/countries/${COUNTRY_ID}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCity(CITY_ID: number) {
  try {
    const apiUrl = `${API_URL}/cities/${CITY_ID}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(USER_ID: string) {
  try {
    const apiUrl = `${API_URL}/users/${USER_ID}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
