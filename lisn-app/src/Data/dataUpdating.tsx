import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "./env_variables";
import { COUNTRY, USER, USER_ROLE, USER_STATE } from "./Interfaces";

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

export async function updateUser(entity: USER) {
  try {
    const apiUrl = `${API_URL}/users`;
    const response = await axios.put(apiUrl, entity);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserImage(entity: USER, image: File) {
  try {
    const apiUrl = `${API_URL}/users/${entity._id}`;
    const formData = new FormData();
    formData.append("user_image", image);
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.patch(apiUrl, formData, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserPassword(
  oldPassword: string,
  newPassword: string,
  user_id: string
) {
  try {
    const apiUrl = `${API_URL}/users/update-password/${user_id}`;
    const requestBody = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    const response = await axios.put(apiUrl, requestBody);
    if (response.status == 200) {
      alert("Password Updated Successfully");
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
