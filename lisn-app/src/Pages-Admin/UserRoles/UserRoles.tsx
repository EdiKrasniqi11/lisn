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
      name: "role_name",
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
        (role) => params.id !== undefined && role._id === params.id
      );
      if (editRole !== undefined) {
        setEditableRole(editRole);
        setRoleName(editRole.role_name);
      }
    }
  }, [params]);

  const changeRoleName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
    if (editableRole !== undefined) {
      const newEditableRole = { ...editableRole, role_name: e.target.value };
      setEditableRole(newEditableRole);
    }
  };

  //Data functions
  const deleteUserRoleById = async (ROLE_ID: string) => {
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
          <th>ROLE_NAME</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {userRoles.map((role) => (
          <tr key={role._id}>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            params.id === role._id ? (
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
              <td>{role.role_name}</td>
            )}
            <td>{role.createdAt.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={role._id} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                params.id === role._id ? (
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
