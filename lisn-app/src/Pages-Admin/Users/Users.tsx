import { useParams } from "react-router-dom";
import style from "./Users.module.css";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import {
  COUNTRY,
  DataInputConfig,
  USER,
  USER_ROLE,
  USER_STATE,
} from "../../Data/Interfaces";
import {
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
import LoadingPage from "../../Components/Home-Components/Loading/LoadingPage";

export default function Cities() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<USER[]>([]);
  const [userRoles, setUserRoles] = useState<USER_ROLE[]>([]);
  const [userStates, setUserStates] = useState<USER_STATE[]>([]);
  const [countries, setCountries] = useState<COUNTRY[]>([]);
  const [roleOptions, setRoleOptions] = useState<DataInputConfig["options"]>();
  const [countryOptions, setCountryOptions] =
    useState<DataInputConfig["options"]>();
  const [stateOptions, setStateOptions] =
    useState<DataInputConfig["options"]>();

  const objectName = "User";
  const [stateInputConfig, setStateInputConfig] = useState<DataInputConfig[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserRoles(setUserRoles, setIsLoading);
        await fetchUserStates(setUserStates, setIsLoading);
        await fetchCountries(setCountries, setIsLoading);
        await fetchUsers(setUsers, setIsLoading);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
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
    setRolesAsOptions();
    setStatesAsOptions();
    setCountriesAsOptions();
    setStateInputConfig([
      {
        name: "user_email",
        type: "email",
        placeholder: "Email",
      },
      {
        name: "username",
        type: "text",
        placeholder: "Username",
      },
      {
        name: "user_img",
        type: "file",
        placeholder: "User Image",
      },
      {
        name: "user_password",
        type: "password",
        placeholder: "Password",
      },
      {
        name: "birth_date",
        type: "date",
        placeholder: "Birthdate",
      },
      {
        name: "user_country",
        type: "select",
        placeholder: "",
        options: countryOptions,
      },
      {
        name: "user_role",
        type: "select",
        placeholder: "",
        options: roleOptions,
      },
      {
        name: "user_state",
        type: "select",
        placeholder: "",
        options: stateOptions,
      },
    ]);
  }, [users]);

  function setRolesAsOptions() {
    const newRoleOptions = userRoles.map((role) => ({
      value: role._id,
      label: role.role_name,
    }));
    setRoleOptions(newRoleOptions);
  }
  function setStatesAsOptions() {
    const newStateOptions = userStates.map((state) => ({
      value: state._id,
      label: state.state_name,
    }));
    setStateOptions(newStateOptions);
  }
  function setCountriesAsOptions() {
    const newCountryOptions = countries.map((country) => ({
      value: country.name.common,
      label: country.name.common,
    }));
    setCountryOptions(newCountryOptions);
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
      {isLoading ? <LoadingPage /> : null}
      <thead>
        <tr>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>BIRTHDATE</th>
          <th>ROLE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.user_email}</td>
            <td>{user.birth_date?.toLocaleDateString()}</td>
            <td>{user.user_role?.role_name}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={user._id} />
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
