import { useParams } from "react-router-dom";
import style from "./Users.module.css";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import {
  CITY,
  COUNTRY,
  DataInputConfig,
  USER,
  USER_ROLE,
  USER_STATE,
} from "../../Data/Interfaces";
import {
  fetchCities,
  fetchCountries,
  fetchUserRoles,
  fetchUserStates,
  fetchUsers,
} from "../../Data/dataFetching";
import { deleteUser } from "../../Data/dataDeleting";
import { updateUser } from "../../Data/dataUpdating";
import { registerUser } from "../../Data/dataCreating";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import EditModal from "../../Components/Modals/EditModal/EditModal";

export default function Cities() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<USER[]>([]);
  const [cities, setCities] = useState<CITY[]>([]);
  const [userRoles, setUserRoles] = useState<USER_ROLE[]>([]);
  const [userStates, setUserStates] = useState<USER_STATE[]>([]);
  const [cityOptions, setCityOptions] = useState<DataInputConfig["options"]>();
  const [roleOptions, setRoleOptions] = useState<DataInputConfig["options"]>();
  const [stateOptions, setStateOptions] =
    useState<DataInputConfig["options"]>();

  const [editableUser, setEditableUser] = useState<USER>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [userImg, setUserImg] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [country, setCountry] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [userRole, setUserRole] = useState<number>(0);
  const [userState, setUserState] = useState<number>(0);

  const objectName = "User";
  const [stateInputConfig, setStateInputConfig] = useState<DataInputConfig[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchCities(setCities, setIsLoading);
      await fetchUserRoles(setUserRoles, setIsLoading);
      await fetchUserStates(setUserStates, setIsLoading);
      await fetchUsers(setUsers, setIsLoading);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers(setUsers, setIsLoading);
    };
    fetchData();
  }, [params]);
  useEffect(() => {
    setCitiesAsOptions();
    setRolesAsOptions();
    setStatesAsOptions();
    setStateInputConfig([
      {
        name: "USER_EMAIL",
        type: "email",
        placeholder: "Email",
      },
      {
        name: "USERNAME",
        type: "text",
        placeholder: "Username",
      },
      {
        name: "USER_IMG",
        type: "file",
        placeholder: "User Image",
      },
      {
        name: "USER_PASSWORD",
        type: "password",
        placeholder: "Password",
      },
      {
        name: "BIRTH_DATE",
        type: "date",
        placeholder: "Birthdate",
      },
      {
        name: "GENDER",
        type: "select",
        placeholder: "Gender",
        options: [
          {
            label: "Male",
            value: "M",
          },
          {
            label: "Female",
            value: "F",
          },
          {
            label: "Other",
            value: "O",
          },
        ],
      },
      {
        name: "USER_CITY_ID",
        type: "select",
        placeholder: "City",
        options: cityOptions,
      },
      {
        name: "USER_ROLE_ID",
        type: "select",
        placeholder: "",
        options: roleOptions,
      },
      {
        name: "USER_STATE_ID",
        type: "select",
        placeholder: "",
        options: stateOptions,
      },
    ]);
  }, [users]);

  function setCitiesAsOptions() {
    const newCityOptions = cities.map((city) => ({
      value: city.CITY_ID,
      label: city.CITY_NAME,
    }));
    setCityOptions(newCityOptions);
  }
  function setRolesAsOptions() {
    const newRoleOptions = userRoles.map((role) => ({
      value: role.ROLE_ID,
      label: role.ROLE_NAME,
    }));
    setRoleOptions(newRoleOptions);
  }
  function setStatesAsOptions() {
    const newStateOptions = userStates.map((state) => ({
      value: state.STATE_ID,
      label: state.STATE_NAME,
    }));
    setStateOptions(newStateOptions);
  }

  //Data functions
  const deleteUserById = async (USER_ID: string) => {
    await deleteUser(USER_ID);
  };
  const updateExistingUser = async (entity: USER) => {
    if (entity !== undefined) {
      const result: any = await updateUser(entity);
      return result;
    }
  };
  const createNewUser = async (entity: USER) => {
    const result: any = await registerUser(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>BIRTHDATE</th>
          <th>ROLE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.USER_ID}>
            <td>{user.USER_ID}</td>
            <td>{user.USERNAME}</td>
            <td>{user.USER_EMAIL}</td>
            <td>{user.BIRTH_DATE?.toLocaleDateString()}</td>
            <td>{user.USER_ROLE_ID}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={user.USER_ID} />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal objectName={objectName} deleteFunction={deleteUserById} />
      ) : params.function === "create-item" ? (
        <CreateModal<USER>
          dataInputConfig={stateInputConfig}
          createFunction={createNewUser}
        />
      ) : params.function === "edit-content" ? (
        <EditModal<USER>
          dataInputConfig={stateInputConfig}
          updateFunction={updateExistingUser}
        />
      ) : null}
    </table>
  );
}
