import "./styles/styles.css";
import "../../../global-css/global.css";
import { MdEdit } from "react-icons/md";
import { useRef, useState, useMemo, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Skeleton } from "../Skeleton/Skeleton";
import { GENDER } from "../../../enums/gender.jsx";
import { useProxy } from "../../../context/ProxyContext.jsx";
import { useFavorites } from "../../../context/FavoritesContext.jsx";
function Cards({
  setHasError,
  setHasSuccess,
  management,
  favorites,
  liked,
  setLiked,
  loading,
}) {
  const [disabled, setDisabled] = useState({});
  const [onChanging, setOnChanging] = useState({});
  const [notes, setNotes] = useState({});
  const ref = useRef({});
  const { paginatedCharacters } = useProxy();
  const { createFavorites, updateFavoriteCharacter, deleteCharacter } =
    useFavorites();
  const [isSaving, setIsSaving] = useState(false);

  function errorTimeOut() {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }

  function successTimeOut() {
    setTimeout(() => {
      setHasSuccess(false);
    }, 3000);
  }

  async function handleCreateCharacters(character) {
    await createFavorites(character);
    setHasSuccess(true);
    successTimeOut();
  }

  async function handleUpdateInformation(updateCharacter) {
    await updateFavoriteCharacter(updateCharacter);
  }

  async function handleDeleteFavorite(character_id) {
    await deleteCharacter(character_id);
  }

  const updateCharacters = useMemo(() => {
    const proxyList = Array.isArray(paginatedCharacters)
      ? paginatedCharacters
      : [];

    const favoritesList = Array.isArray(favorites) ? favorites : [];

    return proxyList.filter(
      (character) =>
        !favoritesList.some(
          (favorite) =>
            favorite.name?.toLowerCase() === character?.name.toLowerCase(),
        ),
    );
  }, [paginatedCharacters, favorites]);

  return (
    <div className="main-container-cards">
      {loading ? (
        <Skeleton />
      ) : (
        (management ? updateCharacters : favorites || []).map(
          (character, index) => {
            const id =
              character.character_id ??
              character.url ??
              `${character.name}-${index}`;

            const isLiked = liked[id];
            const isChanging = onChanging[id];
            return (
              <div className="container-cards" key={id}>
                <div className="card">
                  <nav className="card-navigation">
                    <h2 className="title-card">{character.name}</h2>

                    <div className="icons-container">
                      {isLiked && management ? (
                        <MdFavorite
                          className="heart-icon-card"
                          size={20}
                          fill="red"
                          onClick={() =>
                            setLiked((prev) => ({ ...prev, [id]: false }))
                          }
                        />
                      ) : (
                        management && (
                          <MdFavoriteBorder
                            className="heart-icon-card"
                            size={20}
                            onClick={() =>
                              setLiked((prev) => ({ ...prev, [id]: true }))
                            }
                          />
                        )
                      )}
                      {!management && (
                        <MdDelete
                          className="trash-icon-card"
                          size={20}
                          onClick={async () => {
                            
                            if (isSaving) {
                              return;
                            }
                            setIsSaving(true);
                            await handleDeleteFavorite(character.character_id);
                            setIsSaving(false);
                          }}
                        />
                      )}
                    </div>
                  </nav>

                  <textarea
                    value={notes[id] ?? character.notes ?? ""}
                    type="text"
                    className="box"
                    ref={(el) => {
                      ref.current[id] = el;
                    }}
                    placeholder={
                      !management ? character.notes : GENDER[character.gender]
                    }
                    disabled={disabled[id] ?? true}
                    onChange={(event) => {
                      const value = event.target.value;

                      setNotes((prev) => ({ ...prev, [id]: value }));
                      setOnChanging((prev) => ({ ...prev, [id]: true }));
                    }}
                  />

                  {isChanging && management ? (
                    <div className="actions-container">
                      <button
                        type="button"
                        className="btn-card"
                        onClick={async () => {
                          if (!isLiked || !notes[id]) {
                            setHasError(true);

                            errorTimeOut();
                            return;
                          }

                          const createCharacter = {
                            character_id: crypto.randomUUID(),
                            name: character.name,
                            notes: notes[id] || "",
                            created_at: new Date().toISOString(),
                            is_favorite: liked[id],
                          };

                          setDisabled((prev) => ({ ...prev, [id]: true }));
                          setOnChanging((prev) => ({
                            ...prev,
                            [id]: false,
                          }));
                          setLiked((prev) => ({ ...prev, [id]: false }));

                          if (isSaving) {
                            return;
                          }
                          setIsSaving(true);
                          await handleCreateCharacters(createCharacter);
                          setIsSaving(false);

                          setNotes((prev) => ({ ...prev, [id]: undefined }));
                        }}
                      >
                        Salvar
                      </button>

                      <button
                        type="button"
                        className="btn-card"
                        onClick={() => {
                          setOnChanging((prev) => ({
                            ...prev,
                            [id]: false,
                          }));
                          setDisabled((prev) => ({ ...prev, [id]: true }));
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    management && (
                      <button
                        type="button"
                        className="btn-card"
                        onClick={() => {
                          setDisabled((prev) => ({ ...prev, [id]: false }));

                          setTimeout(() => {
                            ref.current[id]?.focus();
                          }, 0);
                        }}
                      >
                        <MdEdit className="icon-edit-card" />
                        Editar
                      </button>
                    )
                  )}

                  {isChanging && !management ? (
                    <div className="actions-container">
                      <button
                        type="button"
                        className="btn-card"
                        onClick={async () => {
                          if (!notes[id]) {
                            setHasError(true);
                            errorTimeOut();
                            return;
                          }

                          const updateCharacter = {
                            character_id: character.character_id,
                            name: character.name,
                            notes: notes[id],
                            is_favorite: character.is_favorite,
                          };

                          setDisabled((prev) => ({ ...prev, [id]: true }));
                          setOnChanging((prev) => ({
                            ...prev,
                            [id]: false,
                          }));

                          if (isSaving) {
                            return;
                          }

                          setIsSaving(true);
                          await handleUpdateInformation(updateCharacter);
                          setIsSaving(false);
                        }}
                      >
                        Salvar
                      </button>

                      <button
                        type="button"
                        className="btn-card"
                        onClick={() => {
                          setOnChanging((prev) => ({
                            ...prev,
                            [id]: false,
                          }));
                          setDisabled((prev) => ({ ...prev, [id]: true }));
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    !management && (
                      <button
                        type="button"
                        className="btn-card"
                        onClick={() => {
                          setDisabled((prev) => ({ ...prev, [id]: false }));

                          setTimeout(() => {
                            ref.current[id]?.focus();
                          }, 0);
                        }}
                      >
                        <MdEdit className="icon-edit-card" />
                        Editar
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          },
        )
      )}
    </div>
  );
}

export { Cards };
