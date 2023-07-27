import axios, { AxiosResponse } from "axios";
import USER_ROLE from "./Interfaces";

// Define types for setData and setIsLoading
type SetDataFunction<T> = React.Dispatch<React.SetStateAction<T>>;
type SetIsLoadingFunction = React.Dispatch<React.SetStateAction<boolean>>;

const fetchUserRoles = async (
  setData: SetDataFunction<USER_ROLE[]>, // Replace YourDataInterface with the actual interface for your data
  setIsLoading: SetIsLoadingFunction
) => {
  try {
    const response: AxiosResponse<USER_ROLE[]> = await axios.get(
      "http://localhost:5001/user_roles",
      {
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total !== undefined) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            console.log(`Download progress: ${progress.toFixed(2)}%`);
          }
        },
      }
    );
    for (const object of response.data) {
      const formatedDate = new Date(object.INSERT_DATE);
      object.INSERT_DATE = formatedDate;
    }
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
};

export default fetchUserRoles;
