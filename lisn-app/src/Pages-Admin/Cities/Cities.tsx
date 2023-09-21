import { useParams } from "react-router-dom";
import style from "./Cities.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { CITY, COUNTRY, DataInputConfig } from "../../Data/Interfaces";
import { fetchCities, fetchCountries } from "../../Data/dataFetching";
import { deleteCity } from "../../Data/dataDeleting";
import { updateCity } from "../../Data/dataUpdating";
import { createCity } from "../../Data/dataCreating";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";

export default function Cities() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<CITY[]>([]);
  const [countries, setCountries] = useState<COUNTRY[]>([]);
  const [editableCity, setEditableCity] = useState<CITY>();
  const [cityName, setCityName] = useState<string>("");
  const [countryId, setCountryId] = useState<number>(0);
  const [countryOptions, setCountryOptions] =
    useState<DataInputConfig["options"]>();
  const objectName = "City";
  const [stateInputConfig, setStateInputConfig] = useState<DataInputConfig[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchCities(setCities, setIsLoading);
      await fetchCountries(setCountries, setIsLoading);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetchCities(setCities, setIsLoading);
      await fetchCountries(setCountries, setIsLoading);
    };
    fetchData();
    if (params.function === "edit-content") {
      const editCity = cities.find(
        (city) =>
          params.id !== undefined && city.CITY_ID === parseInt(params.id)
      );
      if (editCity !== undefined) {
        setEditableCity(editCity);
        setCityName(editCity.CITY_NAME);
        setCountryId(editCity.COUNTRY_ID);
      }
    }
  }, [params]);
  useEffect(() => {
    setCountriesAsOptions();
    setStateInputConfig([
      {
        name: "CITY_NAME",
        type: "text",
        placeholder: "City name",
      },
      {
        name: "COUNTRY_ID",
        type: "select",
        options: countryOptions,
      },
    ]);
  }, [countries]);

  const changeCityName = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    if (editableCity !== undefined) {
      const newEditableCity = {
        ...editableCity,
        CITY_NAME: e.target.value,
      };
      setEditableCity(newEditableCity);
    }
  };
  const changeCountryId = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryId(parseInt(e.target.value));
    if (editableCity !== undefined) {
      const newEditableCity = {
        ...editableCity,
        COUNTRY_ID: parseInt(e.target.value),
      };
      setEditableCity(newEditableCity);
    }
  };
  function findCountry(country_id: number) {
    const selectedCountry: COUNTRY | undefined = countries.find(
      (country) => country.COUNTRY_ID === country_id
    );
    return selectedCountry?.COUNTRY_NAME;
  }
  function setCountriesAsOptions() {
    const newCountryOptions = countries.map((country) => ({
      value: country.COUNTRY_ID,
      label: country.COUNTRY_NAME,
    }));
    setCountryOptions(newCountryOptions);
  }

  //Data functions
  const deleteCityById = async (CITY_ID: number) => {
    await deleteCity(CITY_ID);
  };
  const updateExistingCity = async (entity: CITY) => {
    if (entity !== undefined) {
      const result: any = await updateCity(entity);
      console.log(result);
      return result;
    }
  };
  const createNewCity = async (entity: CITY) => {
    const result: any = await createCity(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>CITY_NAME</th>
          <th>COUNTRY</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city) => (
          <tr key={city.CITY_ID}>
            <td>{city.CITY_ID}</td>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            parseInt(params.id) === city.CITY_ID ? (
              <td>
                <input
                  type="text"
                  placeholder="City Name"
                  value={cityName}
                  onChange={(e) => changeCityName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{city.CITY_NAME}</td>
            )}
            {params.function === "edit-content" &&
            params.id !== undefined &&
            parseInt(params.id) === city.CITY_ID ? (
              <td>
                <select
                  className={style.selectElement}
                  value={countryId}
                  onChange={(e) => changeCountryId(e)}
                >
                  <option value={0} disabled>
                    Country
                  </option>
                  {countries.map((country) => (
                    <option value={country.COUNTRY_ID}>
                      {country.COUNTRY_NAME}
                    </option>
                  ))}
                </select>
              </td>
            ) : (
              <td>{findCountry(city.COUNTRY_ID)}</td>
            )}
            <td>{city.INSERT_DATE.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={city.CITY_ID} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                parseInt(params.id) === city.CITY_ID ? (
                <AdminEditOptions<CITY>
                  updateFunction={updateExistingCity}
                  updatedObject={editableCity}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal objectName={objectName} deleteFunction={deleteCityById} />
      ) : params.function === "create-item" ? (
        <CreateModal<CITY>
          dataInputConfig={stateInputConfig}
          createFunction={createNewCity}
        />
      ) : null}
    </table>
  );
}
