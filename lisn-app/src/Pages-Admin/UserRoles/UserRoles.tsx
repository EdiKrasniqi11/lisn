import { ChangeEvent, useEffect, useState } from "react";
import { DataInputConfig, USER_ROLE } from "../../Data/Interfaces";
import { deleteUserRole } from "../../Data/dataDeleting";
import style from "./UserRoles.module.css";
import { fetchUserRoles } from "../../Data/dataFetching";
import { useParams } from "react-router-dom";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import { updateUserRole } from "../../Data/dataUpdating";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import { createUserRole } from "../../Data/dataCreating";

export default function UserRoles() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<USER_ROLE[]>([]);
  const [editableRole, setEditableRole] = useState<USER_ROLE>();
  const [roleName, setRoleName] = useState<string>("");
  const objectName = "User Role";
  const stateInputConfig: DataInputConfig[] = [
    {
      name: "ROLE_NAME",
      type: "text",
      placeholder: "Role name",
    },
  ];

  useEffect(() => {
    fetchUserRoles(setUserRoles, setIsLoading);
  }, []);
  useEffect(() => {
    fetchUserRoles(setUserRoles, setIsLoading);
    if (params.function === "edit-content") {
      const editRole = userRoles.find(
        (role) =>
          params.id !== undefined && role.ROLE_ID === parseInt(params.id)
      );
      if (editRole !== undefined) {
        setEditableRole(editRole);
        setRoleName(editRole.ROLE_NAME);
      }
    }
  }, [params]);

  const changeRoleName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
    if (editableRole !== undefined) {
      const newEditableRole = { ...editableRole, ROLE_NAME: e.target.value };
      setEditableRole(newEditableRole);
    }
  };

  //Data functions
  const deleteUserRoleById = async (ROLE_ID: number) => {
    await deleteUserRole(ROLE_ID);
  };
  const updateRole = async (entity: USER_ROLE) => {
    if (entity !== undefined) {
      const result = await updateUserRole(entity);
      return result;
    }
  };
  const createRole = async (entity: USER_ROLE) => {
    const result = await createUserRole(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>ROLE_NAME</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {userRoles.map((role) => (
          <tr key={role.ROLE_ID}>
            <td>{role.ROLE_ID}</td>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            parseInt(params.id) === role.ROLE_ID ? (
              <td>
                <input
                  type="text"
                  placeholder="Role Name"
                  value={roleName}
                  onChange={(e) => changeRoleName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{role.ROLE_NAME}</td>
            )}
            <td>{role.INSERT_DATE.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={role.ROLE_ID} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                parseInt(params.id) === role.ROLE_ID ? (
                <AdminEditOptions<USER_ROLE>
                  updateFunction={updateRole}
                  updatedObject={editableRole}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal
          objectName={objectName}
          deleteFunction={deleteUserRoleById}
        />
      ) : params.function === "create-item" ? (
        <CreateModal<USER_ROLE>
          dataInputConfig={stateInputConfig}
          createFunction={createRole}
        />
      ) : null}
    </table>
  );
}
