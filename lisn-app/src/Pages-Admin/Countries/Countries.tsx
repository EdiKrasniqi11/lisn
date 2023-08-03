import { ChangeEvent, useEffect, useState } from "react";
import { COUNTRY, DataInputConfig, USER_ROLE } from "../../Data/Interfaces";
import { deleteCountry } from "../../Data/dataDeleting";
import style from "./Countries.module.css";
import { fetchCountries } from "../../Data/dataFetching";
import { useParams } from "react-router-dom";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import { updateCountry } from "../../Data/dataUpdating";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import { createCountry } from "../../Data/dataCreating";

export default function Countries() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<COUNTRY[]>([]);
  const [editableCountry, setEditableCountry] = useState<COUNTRY>();
  const [countryName, setCountryName] = useState<string>("");
  const [countryIcon, setCountryIcon] = useState<string>("");
  const objectName = "Country";
  const stateInputConfig: DataInputConfig[] = [
    {
      name: "COUNTRY_NAME",
      type: "text",
      placeholder: "Country name",
    },
    {
      name: "COUNTRY_ICON",
      type: "text",
      placeholder: "Country icon",
    },
  ];

  useEffect(() => {
    fetchCountries(setCountries, setIsLoading);
  }, []);
  useEffect(() => {
    fetchCountries(setCountries, setIsLoading);
    if (params.function === "edit-content") {
      const editCountry = countries.find(
        (country) =>
          params.id !== undefined && country.COUNTRY_ID === parseInt(params.id)
      );
      if (editCountry !== undefined) {
        setEditableCountry(editCountry);
        setCountryName(editCountry.COUNTRY_NAME);
        setCountryIcon(editCountry.COUNTRY_ICON);
      }
    }
  }, [params]);

  const changeCountryName = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
    if (editableCountry !== undefined) {
      const newEditableCountry = {
        ...editableCountry,
        COUNTRY_NAME: e.target.value,
      };
      setEditableCountry(newEditableCountry);
    }
  };
  const changeCountryIcon = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryIcon(e.target.value);
    if (editableCountry !== undefined) {
      const newEditableCountry = {
        ...editableCountry,
        COUNTRY_ICON: e.target.value,
      };
      setEditableCountry(newEditableCountry);
    }
  };

  //Data functions
  const deleteCountryById = async (COUNTRY_ID: number) => {
    await deleteCountry(COUNTRY_ID);
  };
  const updateExistingCountry = async (entity: COUNTRY) => {
    if (entity !== undefined) {
      const result: any = await updateCountry(entity);
      return result;
    }
  };
  const createNewCountry = async (entity: COUNTRY) => {
    const result: any = await createCountry(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>COUNTRY_NAME</th>
          <th>COUNTRY_ICON</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.COUNTRY_ID}>
            <td>{country.COUNTRY_ID}</td>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            parseInt(params.id) === country.COUNTRY_ID ? (
              <td>
                <input
                  type="text"
                  placeholder="Country Name"
                  value={countryName}
                  onChange={(e) => changeCountryName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{country.COUNTRY_NAME}</td>
            )}
            {params.function === "edit-content" &&
            params.id !== undefined &&
            parseInt(params.id) === country.COUNTRY_ID ? (
              <td>
                <input
                  type="text"
                  placeholder="Country Icon"
                  value={countryIcon}
                  onChange={(e) => changeCountryIcon(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{country.COUNTRY_ICON}</td>
            )}
            <td>{country.INSERT_DATE.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={country.COUNTRY_ID} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                parseInt(params.id) === country.COUNTRY_ID ? (
                <AdminEditOptions<COUNTRY>
                  updateFunction={updateExistingCountry}
                  updatedObject={editableCountry}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal
          objectName={objectName}
          deleteFunction={deleteCountryById}
        />
      ) : params.function === "create-item" ? (
        <CreateModal<COUNTRY>
          dataInputConfig={stateInputConfig}
          createFunction={createNewCountry}
        />
      ) : null}
    </table>
  );
}
