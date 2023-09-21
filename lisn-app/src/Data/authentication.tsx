import axios, { AxiosResponse } from "axios";
import { USER } from "./Interfaces";
import { API_URL } from "./env_variables";
import secureLocalStorage from "react-secure-storage";

export async function login(entity: USER) {
  try {
    const apiUrl = `${API_URL}/authentication/login`;

    const response = await axios.post(apiUrl, entity);
    secureLocalStorage.setItem("access-token", response.data.ACCESS_TOKEN);
    secureLocalStorage.setItem("refresh-token", response.data.REFRESH_TOKEN);

    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function logout() {
  const apiUrl = `${API_URL}/authentication/logout`;
  const refreshToken = {
    refreshToken: secureLocalStorage.getItem("refresh-token"),
  };
  const response = await axios.post(apiUrl, refreshToken);

  if (response.status === 204) {
    secureLocalStorage.removeItem("refresh-token");
    secureLocalStorage.removeItem("access-token");
    return true;
  } else {
    return false;
  }
}

export const fetchMyUser = async () => {
  const apiUrl = `${API_URL}/users/my-user`;
  const headers = {
    Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
  };
  const response: AxiosResponse<USER> = await axios.get(apiUrl, { headers });
  return response.data;
};

export const refreshToken = async () => {
  const apiUrl = `${API_URL}/authentication/refresh-token`;
  const response = await axios.post(apiUrl, {
    REFRESH_TOKEN: secureLocalStorage.getItem("refresh-token"),
  });

  if (response.data.status === 200) {
    return response.data.ACCESS_TOKEN as string;
  } else {
    return `Error code: ${response.data.status}. ${response.data.message}`;
  }
  return response.data.ACCESS_TOKEN;
};
