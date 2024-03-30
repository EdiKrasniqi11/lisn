import style from "./UserStates.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DataInputConfig, USER_STATE } from "../../Data/Interfaces";
import { fetchUserStates } from "../../Data/dataFetching";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import { deleteUserState } from "../../Data/dataDeleting";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import { updateUserState } from "../../Data/dataUpdating";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import { createUserState } from "../../Data/dataCreating";

export default function UserStates() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userStates, setUserStates] = useState<USER_STATE[]>([]);
  const [editableState, setEditableState] = useState<USER_STATE>();
  const [stateName, setStateName] = useState<string>("");
  const objectName = "User State";
  const stateInputConfig: DataInputConfig[] = [
    {
      name: "state_name",
      type: "text",
      placeholder: "State name",
    },
  ];

  useEffect(() => {
    fetchUserStates(setUserStates, setIsLoading);
  }, []);
  useEffect(() => {
    fetchUserStates(setUserStates, setIsLoading);
    if (params.function === "edit-content") {
      const editState = userStates.find(
        (state) => params.id !== undefined && state._id === params.id
      );
      if (editState !== undefined) {
        setEditableState(editState);
        setStateName(editState.state_name);
      }
    }
  }, [params]);

  //Edit Function
  const changeStateName = (e: ChangeEvent<HTMLInputElement>) => {
    setStateName(e.target.value);
    if (editableState !== undefined) {
      const newEditableState = { ...editableState, STATE_NAME: e.target.value };
      setEditableState(newEditableState);
    }
  };

  //Data Functions
  const deleteUserStateById = async (STATE_ID: string) => {
    await deleteUserState(STATE_ID);
  };
  const updateState = async (entity: USER_STATE) => {
    const result = await updateUserState(entity);
    return result;
  };
  const createState = async (entity: USER_STATE) => {
    const result = await createUserState(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>STATE_NAME</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {userStates.map((state) => (
          <tr key={state._id}>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            params.id === state._id ? (
              <td>
                <input
                  type="text"
                  placeholder="Role Name"
                  value={stateName}
                  onChange={(e) => changeStateName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{state.state_name}</td>
            )}
            <td>{state.createdAt.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={state._id} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                params.id === state._id ? (
                <AdminEditOptions<USER_STATE>
                  updateFunction={updateState}
                  updatedObject={editableState}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal
          objectName={objectName}
          deleteFunction={deleteUserStateById}
        />
      ) : params.function === "create-item" ? (
        <CreateModal<USER_STATE>
          dataInputConfig={stateInputConfig}
          createFunction={createState}
        />
      ) : null}
    </table>
  );
}
