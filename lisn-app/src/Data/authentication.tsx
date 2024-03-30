import axios, { AxiosResponse } from "axios";
import { LoggedUser, USER } from "./Interfaces";
import { API_URL } from "./env_variables";

export async function login(entity: USER) {
  try {
    const apiUrl = `${API_URL}/authentication/login`;

    const response = await axios.post(apiUrl, entity);
    console.log("response.data.ACCESS_TOKEN");
    localStorage.setItem("access-token", response.data.ACCESS_TOKEN);

    return response;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function logout() {
  // const apiUrl = `${API_URL}/authentication/logout`;
  // const refreshToken = {
  //   refreshToken: secureLocalStorage.getItem("refresh-token"),
  // };
  // const response = await axios.post(apiUrl, refreshToken);

  // if (response.status === 204) {
  localStorage.removeItem("access-token");
  return true;
  //   return true;
  // } else {
  //   return false;
  // }
}

export const fetchMyUser = async () => {
  const apiUrl = `${API_URL}/authentication/current-user`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  };
  const response: AxiosResponse<LoggedUser> = await axios.get(apiUrl, {
    headers,
  });
  return response.data;
};

export const fetchMyData = async () => {
  const apiUrl = `${API_URL}/authentication/my-data`;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  };
  const response: AxiosResponse<USER> = await axios.get(apiUrl, {
    headers,
  });
  return response.data;
};
