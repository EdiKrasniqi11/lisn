import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import style from "./EditModal.module.css";
import { DataInputConfig, USER } from "../../../Data/Interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers } from "../../../Data/dataFetching";
import secureLocalStorage from "react-secure-storage";
import { API_URL } from "../../../Data/env_variables";
import axios from "axios";

interface EditModalProps<T> {
  dataInputConfig: DataInputConfig[];
  updateFunction: (entity: T) => Promise<void>;
}

export default function EditModal<T>({
  dataInputConfig,
  updateFunction,
}: EditModalProps<T>) {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<USER>();
  const [users, setUsers] = useState<USER[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<T>({} as T);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers(setUsers, setIsLoading);
    };
    fetchData();
  }, [params]);
  useEffect(() => {
    const foundUser = users.find((user) => user._id === params.id);
    if (foundUser) {
      setUser(foundUser);
      setFormData(foundUser as T);
    }
  }, [users]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = { name: e.target.name, value: e.target.value };
    const updatedFormData: T = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateFunction(formData);
    navigate(-1);
  };

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatValue(value: string | number | Date | undefined): string {
    if (typeof value === "number") {
      return value.toString();
    } else if (value instanceof Date) {
      return formatDate(value);
    } else if (typeof value === "string") {
      return value;
    } else {
      return "";
    }
  }

  return (
    <div className={style.coverDiv}>
      <div className={style.modalDiv}>
        <h1>Update</h1>
        <form
          method="POST"
          className={style.createForm}
          onSubmit={handleSubmit}
        >
          {dataInputConfig.map((input) => (
            <div key={input.name}>
              {input.type === "select" ? (
                <select
                  name={input.name}
                  onChange={(e) => handleChange(e)}
                  value={
                    formData ? String(formData[input.name as keyof T]) : ""
                  }
                >
                  {input.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : input.type === "password" ? null : (
                <input
                  type={input.type}
                  name={input.name}
                  // defaultValue={
                  //   user ? formatValue(user[input.name as keyof USER]) : ""
                  // }
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
