/* eslint-disable jsx-a11y/img-redundant-alt */
import { ChangeEvent, useEffect, useState } from "react";
import { SearchIcon } from "../../Components/Icons/MyIcons";
import style from "./Search.module.css";
import { searchUsers } from "../../Data/dataFetching";
import { USER } from "../../Data/Interfaces";
import { useDebounce } from "../../Data/hooks";
import { IMAGE_URL } from "../../Data/env_variables";
import { useNavigate } from "react-router-dom";
import Background from "../../Components/Home-Components/Background/Background";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<USER[]>([]);
  const debouncedSearch = useDebounce(searchTerm);
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    if (debouncedSearch !== "") {
      const searchResults = await searchUsers(debouncedSearch);
      return searchResults?.data;
    }
    return [];
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setSearchedUsers(await fetchSearchResults());
    };
    fetchUsers();
  }, [debouncedSearch]);

  return (
    <Background>
      <div className={style.modalContainer}>
        <div className={style.searchBox}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.userResults}>
          {searchedUsers?.map((user) => (
            <div
              className={style.searchResultContainer}
              onClick={() => navigate(`/user-profile/${user._id}`)}
            >
              <div className={style.profilePicture}>
                <div className={style.imageContainer}>
                  {user?.user_image ? (
                    <img
                      src={IMAGE_URL(user.user_image)}
                      alt="Image"
                      id={style.profileImage}
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="75%"
                      height="75%"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  )}
                </div>
              </div>
              <h3>{user.username}</h3>
            </div>
          ))}
        </div>
      </div>
    </Background>
  );
}
