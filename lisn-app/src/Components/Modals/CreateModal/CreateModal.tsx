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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      const updatedFormData: T = { ...formData, [name]: file };
      setFormData(updatedFormData);
    } else {
      const updatedFormData: T = { ...formData, [name]: value };
      setFormData(updatedFormData);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await createFunction(formData);
      if (response !== undefined) {
        navigate(-1);
      }
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
          encType="multipart/form-data"
        >
          {dataInputConfig.map((input) => (
            <div key={input.name}>
              {input.type === "select" ? (
                <select
                  name={input.name}
                  defaultValue={0}
                  onChange={handleChange}
                  required={true}
                >
                  <option value={0} disabled>
                    Select
                  </option>
                  {input.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={handleChange}
                />
              )}
            </div>
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
