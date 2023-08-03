import axios, { AxiosResponse } from "axios";
import { API_URL } from "./env_variables";
import { COUNTRY } from "./Interfaces";

export async function getCountryById(COUNTRY_ID: number) {
  try {
    const apiUrl = `${API_URL}/countries/${COUNTRY_ID}`;
    const response: AxiosResponse<COUNTRY> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
