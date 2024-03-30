import { FormEvent, useState } from "react";
import { USER } from "../../../Data/Interfaces";
import { useNavigate } from "react-router-dom";
import style from "./PasswordChange.module.css";
import { updateUserPassword } from "../../../Data/dataUpdating";

interface PasswordChangeProps {
  user: USER | undefined;
}

export default function PasswordChange({ user }: PasswordChangeProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const response: any = await updateUserPassword(
        oldPassword,
        newPassword,
        user?._id as string
      );
      if (response.status !== 200) {
        console.log(response.data.message);
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <div className={style.coverDiv}>
      <div className={style.modalDiv}>
        <h1>Change Password</h1>
        <form
          method="POST"
          className={style.createForm}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label>Old Password</label>
          <input
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <br />
          <label>New Password</label>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <label>Confirm New Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <div className={style.buttonContainer}>
            <button type="submit" className={style.confirmButton}>
              CONFIRM CHANGE
            </button>
            <button
              className={style.cancelButton}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
