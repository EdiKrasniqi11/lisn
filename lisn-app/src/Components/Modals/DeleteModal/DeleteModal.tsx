import { useLocation, useNavigate } from "react-router-dom";

import style from "./DeleteModal.module.css";

interface DeleteModalProps {
  objectName: string;
  deleteFunction: (id: number) => Promise<void>;
}

export default function DeleteModal({
  objectName,
  deleteFunction,
}: DeleteModalProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const id = parseInt(locationPath[4]);

  const deleteObject = async (id: any) => {
    await deleteFunction(id);
    navigate(-1);
  };
  return (
    <div className={style.coverDiv}>
      <div className={style.modalDiv}>
        <h3>
          Are you sure you want to delete the {objectName} with ID: {id} ?
        </h3>
        <div className={style.buttonContainer}>
          <button
            className={style.confirmButton}
            onClick={() => deleteObject(id)}
          >
            Confirm
          </button>
          <button
            className={style.cancelButton}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
