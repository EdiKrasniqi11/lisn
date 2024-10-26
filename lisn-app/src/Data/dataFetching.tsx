import axios, { AxiosResponse } from "axios";
import {
  COUNTRY,
  GENRE,
  SUBGENRE,
  USER,
  USER_ROLE,
  USER_STATE,
} from "./Interfaces";
import { API_URL, SONG_API_URL } from "./env_variables";

//Set function template
async function fetchTemplate<T extends { createdAt: Date }>(
  path: string,
  setData: SetDataFunction<T[]>,
  setIsLoading: SetIsLoadingFunction,
  songApi?: boolean
) {
  try {
    const apiUrl = songApi ? `${SONG_API_URL}/${path}` : `${API_URL}/${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response: AxiosResponse<T[]> = await axios.get(apiUrl, {
      headers: headers,
    });
    for (const object of response.data) {
      const formatedDate = new Date(object.createdAt);
      object.createdAt = formatedDate;
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

export const fetchGenres = async (
  setData: SetDataFunction<GENRE[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<GENRE>("genres", setData, setIsLoading, true);
};

export const fetchSubGenres = async (
  setData: SetDataFunction<SUBGENRE[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<GENRE>("sub-genres", setData, setIsLoading, true);
};

export const fetchCountries = async (
  setData: SetDataFunction<COUNTRY[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  fetchTemplate<COUNTRY>("countries", setData, setIsLoading);
};

export const fetchUsers = async (
  setData: SetDataFunction<USER[]>,
  setIsLoading: SetIsLoadingFunction
) => {
  try {
    const apiUrl = `${API_URL}/users`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response: AxiosResponse<USER[]> = await axios.get(apiUrl, {
      headers: headers,
    });
    for (const object of response.data) {
      const formatedDate = new Date(object.createdAt);
      object.createdAt = formatedDate;
      if (object.birth_date) {
        const formattedBirthDate = new Date(object.birth_date);
        object.birth_date = formattedBirthDate;
      }
    }
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
};

export const fetchImage = async (imageName: string) => {
  try {
    const apiUrl = `${API_URL}/images/${imageName}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching image: ", error);
  }
};

export const searchUsers = async (username: string) => {
  try {
    const apiUrl = `${API_URL}/search/users?search=${username}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error("Error fetching search results:" + error);
  }
};

export const fetchUser = async (id: string) => {
  try {
    const apiUrl = `${API_URL}/users/${id}`;
    const response: AxiosResponse<USER> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching user" + error);
  }
};

export const fetchFollowers = async (
  id: string,
  limit: number,
  page: number
) => {
  try {
    const apiUrl = `${API_URL}/follow/followers/${id}?limit=${limit}&page=${page}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers" + error);
  }
};

export const fetchFollowings = async (
  id: string,
  limit: number,
  page: number
) => {
  try {
    const apiUrl = `${API_URL}/follow/followings/${id}?limit=${limit}&page=${page}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching followers" + error);
  }
};

export const fetchFollowerCount = async (id: string) => {
  try {
    const apiUrl = `${API_URL}/follow/followers/count/${id}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching follower count" + error);
  }
};

export const fetchFollowingCount = async (id: string) => {
  try {
    const apiUrl = `${API_URL}/follow/followings/count/${id}`;
    const response: AxiosResponse = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching follower count" + error);
  }
};

export const userFollows = async (id: string) => {
  try {
    const apiUrl = `${API_URL}/follow/follower/${id}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    };
    const response: AxiosResponse = await axios.get(apiUrl, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error checking follower: " + error);
  }
};
