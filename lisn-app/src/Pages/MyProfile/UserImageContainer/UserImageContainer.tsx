/* eslint-disable no-restricted-globals */
import { USER } from "../../../Data/Interfaces";
import { Camera } from "../../../Components/Icons/MyIcons";
import Views from "../../../Assets/Images/Views.jpg";
import style from "./UserImageContainer.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchImage } from "../../../Data/dataFetching";
import { API_URL, IMAGE_URL } from "../../../Data/env_variables";
import { updateUserImage } from "../../../Data/dataUpdating";

interface ImageContainerProps {
  user: USER | undefined;
}

export default function ImageContainer({ user }: ImageContainerProps) {
  const imagePath = user?.user_image ? user.user_image : "";
  const imageUrl = IMAGE_URL(imagePath);

  const setUserImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await updateUserImage(user as USER, e.target.files[0]);
      location.reload();
    }
  };

  return (
    <div className={style.profilePicture}>
      <div className={style.imageContainer}>
        {user?.user_image ? (
          <img src={imageUrl} alt="Image" id={style.profileImage} />
        ) : (
          <div className={style.updatePictureNoHover}>
            <h4>Update Picture</h4>
            <Camera />
          </div>
        )}
      </div>
      <div className={style.updatePicture}>
        <h4>Update Picture</h4>
        <Camera />
      </div>
      <input
        type="file"
        onChange={(e) => setUserImage(e)}
        className={style.inputImage}
      />
    </div>
  );
}
