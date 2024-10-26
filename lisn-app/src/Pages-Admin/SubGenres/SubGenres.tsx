import { ChangeEvent, useEffect, useState } from "react";
import { DataInputConfig, GENRE, SUBGENRE } from "../../Data/Interfaces";
import {
  deleteGenre,
  deleteSubGenre,
  deleteUserRole,
} from "../../Data/dataDeleting";
import style from "./SubGenres.module.css";
import {
  fetchGenres,
  fetchSubGenres,
  fetchUserRoles,
} from "../../Data/dataFetching";
import { useParams } from "react-router-dom";
import DeleteModal from "../../Components/Modals/DeleteModal/DeleteModal";
import AdminOptions from "../../Components/Admin-Components/AdminOptions/AdminOptions";
import AdminEditOptions from "../../Components/Admin-Components/AdminEditOptions/AdminEditOptions";
import {
  updateGenre,
  updateSubGenre,
  updateUserRole,
} from "../../Data/dataUpdating";
import CreateModal from "../../Components/Modals/CreateModal/CreateModal";
import {
  createGenre,
  createSubGenre,
  createUserRole,
} from "../../Data/dataCreating";

export default function SubGenres() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [subGenres, setSubGenres] = useState<SUBGENRE[]>([]);
  const [genres, setGenres] = useState<GENRE[]>([]);
  const [genreOptions, setGenreOptions] =
    useState<DataInputConfig["options"]>();
  const [editableSubGenre, setEditableSubGenre] = useState<SUBGENRE>();
  const [subName, setSubName] = useState<string | undefined>("");
  const [genre, setGenre] = useState<GENRE | undefined>();
  const objectName = "Song Sub-Genre";

  const [stateInputConfig, setStateInputConfig] = useState<DataInputConfig[]>(
    []
  );

  useEffect(() => {
    fetchSubGenres(setSubGenres, setIsLoading);
    fetchGenres(setGenres, setIsLoading);
  }, []);
  useEffect(() => {
    fetchSubGenres(setSubGenres, setIsLoading);
    if (params.function === "edit-content") {
      const editGenre = subGenres.find(
        (genre) => params.id !== undefined && genre._id === params.id
      );
      if (editGenre !== undefined) {
        setEditableSubGenre(editGenre);
        setSubName(editGenre.sub_name);
        setGenre(editGenre.genre);
      }
    }
  }, [params]);

  useEffect(() => {
    setGenresAsOptions();
    setStateInputConfig([
      {
        name: "sub_name",
        type: "text",
        placeholder: "sub-genre name",
      },
      {
        name: "genre",
        type: "select",
        placeholder: "",
        options: genreOptions,
      },
    ]);
  }, [subGenres]);

  const changeGenreName = (e: ChangeEvent<HTMLInputElement>) => {
    setSubName(e.target.value);
    if (editableSubGenre !== undefined) {
      const newEditableGenre = {
        ...editableSubGenre,
        genre_name: e.target.value,
      };
      setEditableSubGenre(newEditableGenre);
    }
  };

  const changeGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    let genre = genres.find((g) => g._id === e.target.value);
    setGenre(genre);
    if (editableSubGenre !== undefined) {
      const newEditableGenre = {
        ...editableSubGenre,
        genre: genre,
      };
      setEditableSubGenre(newEditableGenre);
    }
  };

  function setGenresAsOptions() {
    const newRoleOptions = genres.map((genre) => ({
      value: genre._id,
      label: genre.genre_name,
    }));
    setGenreOptions(newRoleOptions);
  }

  //Data functions
  const deleteGenreById = async (id: string) => {
    await deleteSubGenre(id);
  };

  const updateExistingGenre = async (entity: SUBGENRE) => {
    if (entity !== undefined) {
      const result = await updateSubGenre(entity);
      return result;
    }
  };
  const createNewGenre = async (entity: SUBGENRE) => {
    const result = await createSubGenre(entity);
    return result;
  };

  return (
    <table className={style.dataTable}>
      <thead>
        <tr>
          <th>SUB_NAME</th>
          <th>GENRE</th>
          <th>INSERT_DATE</th>
          <th>OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {subGenres.map((sub) => (
          <tr key={sub._id}>
            {params.function === "edit-content" &&
            params.id !== undefined &&
            params.id === sub._id ? (
              <td>
                <input
                  type="text"
                  placeholder="Genre Name"
                  value={subName}
                  onChange={(e) => changeGenreName(e)}
                  className={style.editInput}
                />
              </td>
            ) : (
              <td>{sub.sub_name}</td>
            )}
            {params.function === "edit-content" &&
            params.id !== undefined &&
            params.id === sub._id ? (
              <td>
                <select
                  placeholder="Genre Name"
                  value={genre?._id}
                  onChange={(e) => changeGenre(e)}
                  className={style.editInput}
                >
                  {genres.map((gen) => (
                    <option value={gen._id}>{gen.genre_name}</option>
                  ))}
                </select>
              </td>
            ) : (
              <td>{sub.genre?.genre_name}</td>
            )}
            <td>{sub.createdAt.toLocaleDateString()}</td>
            <td>
              {params.function === undefined ? (
                <AdminOptions id={sub._id} />
              ) : params.function === "edit-content" &&
                params.id !== undefined &&
                params.id === sub._id ? (
                <AdminEditOptions<GENRE>
                  updateFunction={updateExistingGenre}
                  updatedObject={editableSubGenre}
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
