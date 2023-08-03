import { ChangeEvent, FormEvent, useState } from "react";
import { DataInputConfig, USER_STATE } from "../../../Data/Interfaces";
import style from "./CreateModal.module.css";
import { useNavigate } from "react-router-dom";

interface CreateModalProps<T> {
  dataInputConfig: DataInputConfig[];
  createFunction: (entity: T) => Promise<void>;
}

export default function CreateModal<T>({
  dataInputConfig,
  createFunction,
}: CreateModalProps<T>) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<T>({} as T);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = { name: e.target.name, value: e.target.value };
    const updatedFormData: T = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createFunction(formData);
      console.log(result);
      navigate(-1);
    } catch (error) {
      console.error("Error creating entity:", error);
    }
  };

  return (
    <div className={style.coverDiv}>
      <div className={style.modalDiv}>
        <h1>Create</h1>
        <form
          method="POST"
          className={style.createForm}
          onSubmit={handleSubmit}
        >
          {dataInputConfig.map((input) => (
            <input
              type={input.type}
              name={input.name}
              key={input.name}
              placeholder={input.placeholder}
              onChange={handleChange}
            />
          ))}
          <div className={style.buttonContainer}>
            <button className={style.confirmButton} type="submit">
              Confirm
            </button>
            <button
              className={style.cancelButton}
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
