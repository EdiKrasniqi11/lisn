import axios from "axios";
import { API_URL } from "./env_variables";

export async function deleteUserRole(ROLE_ID: string) {
  try {
    const apiUrl = `${API_URL}/user-roles/${ROLE_ID}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserState(STATE_ID: string) {
  try {
    const apiUrl = `${API_URL}/user-states/${STATE_ID}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(USER_ID: string) {
  try {
    const apiUrl = `${API_URL}/users/${USER_ID}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function unfollowUser(id: string) {
  try {
    const apiUrl = `${API_URL}/follow/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response = await axios.delete(apiUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
