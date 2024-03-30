import axios from "axios";
import { API_URL } from "./env_variables";
import { COUNTRY, USER, USER_ROLE, USER_STATE } from "./Interfaces";

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
