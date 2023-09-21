import axios, { AxiosResponse } from "axios";
import { CITY, COUNTRY, USER, USER_ROLE, USER_STATE } from "./Interfaces";
import { API_URL } from "./env_variables";
import secureLocalStorage from "react-secure-storage";

//Set function template
async function fetchTemplate<T extends { INSERT_DATE: Date }>(
  path: string,
  setData: SetDataFunction<T[]>,
  setIsLoading: SetIsLoadingFunction
) {
  try {
    const apiUrl = `${API_URL}/${path}`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response: AxiosResponse<T[]> = await axios.get(apiUrl, {
      headers: headers,
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          console.log(`Download progress: ${progress.toFixed(2)}%`);
        }
      },
    });
    for (const object of response.data) {
      const formatedDate = new Date(object.INSERT_DATE);
      object.INSERT_DATE = formatedDate;
    }
    setData(response.data);
    setIsLoading(false);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
}

// Define types for setData and setIsLoading
type SetDataFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type SetIsLoadingFunction = React.Dispatch<React.SetStateAction<boolean>>;

// Data  functions
export const fetchUserRoles = async (
  setData: SetDataFunction<USER_ROLE[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<USER_ROLE>("user-roles", setData, setIsLoading);
};

export const fetchUserStates = async (
  setData: SetDataFunction<USER_STATE[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<USER_STATE>("user-states", setData, setIsLoading);
};

export const fetchCountries = async (
  setData: SetDataFunction<COUNTRY[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<COUNTRY>("countries", setData, setIsLoading);
};

export const fetchCities = async (
  setData: SetDataFunction<CITY[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<CITY>("cities", setData, setIsLoading);
};

export const fetchUsers = async (
  setData: SetDataFunction<USER[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  try {
    const apiUrl = `${API_URL}/users`;
    const headers = {
      Authorization: `Bearer ${secureLocalStorage.getItem("access-token")}`,
    };
    const response: AxiosResponse<USER[]> = await axios.get(apiUrl, {
      headers: headers,
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total !== undefined) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          console.log(`Download progress: ${progress.toFixed(2)}%`);
        }
      },
    });
    for (const object of response.data) {
      const formatedDate = new Date(object.INSERT_DATE);
      object.INSERT_DATE = formatedDate;
      if (object.BIRTH_DATE) {
        const formattedBirthDate = new Date(object.BIRTH_DATE);
        object.BIRTH_DATE = formattedBirthDate;
      }
    }
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
};
