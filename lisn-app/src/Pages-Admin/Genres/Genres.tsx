import { ChangeEvent, useEffect, useState } from "react";
import { DataInputConfig, GENRE } from "../../Data/Interfaces";
import { deleteGenre, deleteUserRole } from "../../Data/dataDeleting";
import style from "./Genres.module.css";
import { fetchGenres, fetchUserRoles } from "../../Data/dataFetching";
import { useParams } from "react-router-dom";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import { updateGenre, updateUserRole } from "../../Data/dataUpdating";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import { createGenre, createUserRole } from "../../Data/dataCreating";

export default function Genres() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<GENRE[]>([]);
  const [editableGenre, setEditableGenre] = useState<GENRE>();
  const [genreName, setGenreName] = useState<string | undefined>("");
  const objectName = "Song Genre";
  const stateInputConfig: DataInputConfig[] = [
    {
      name: "genre_name",
      type: "text",
      placeholder: "genre name",
    },
  ];

  useEffect(() => {
    fetchGenres(setGenres, setIsLoading);
  }, []);
  useEffect(() => {
    fetchGenres(setGenres, setIsLoading);
    if (params.function === "edit-content") {
      const editGenre = genres.find(
        (genre) => params.id !== undefined && genre._id === params.id
      );
      if (editGenre !== undefined) {
        setEditableGenre(editGenre);
        setGenreName(editGenre.genre_name);
      }
    }
  }, [params]);

  const changeGenreName = (e: ChangeEvent<HTMLInputElement>) => {
    setGenreName(e.target.value);
    if (editableGenre !== undefined) {
      const newEditableGenre = { ...editableGenre, genre_name: e.target.value };
      setEditableGenre(newEditableGenre);
    }
  };

  //Data functions
  const deleteGenreById = async (id: string) => {
    await deleteGenre(id);
  };
  const updateExistingGenre = async (entity: GENRE) => {
    if (entity !== undefined) {
      const result = await updateGenre(entity);
      return result;
    }
  };
  const createNewGenre = async (entity: GENRE) => {
    const result = await createGenre(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>GENRE_NAME</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {genres.map((genre) => (
          <tr key={genre._id}>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            params.id === genre._id ? (
              <td>
                <input
                  type="text"
                  placeholder="Genre Name"
                  value={genreName}
                  onChange={(e) => changeGenreName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{genre.genre_name}</td>
            )}
            <td>{genre.createdAt.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={genre._id} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                params.id === genre._id ? (
                <AdminEditOptions<GENRE>
                  updateFunction={updateExistingGenre}
                  updatedObject={editableGenre}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
      {params.function === "confirm-deletion" ? (
        <DeleteModal objectName={objectName} deleteFunction={deleteGenreById} />
      ) : params.function === "create-item" ? (
        <CreateModal<GENRE>
          dataInputConfig={stateInputConfig}
          createFunction={createNewGenre}
        />
      ) : null}
    </table>
  );
}
