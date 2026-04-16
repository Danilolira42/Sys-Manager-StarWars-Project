import "./styles/styles.css";
import "../../../global-css/global.css";
import { MdEdit } from "react-icons/md";
import { useRef, useEffect, useState, useMemo } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Services } from "../../../services/Services";
import { Skeleton } from "../Skeleton/Skeleton";
import { GENDER } from "../../../enums/gender.jsx";

function Cards({
  search,
  paginatedCharacters,
  loading,
  setIsLoading,
  setHasError,
  setHasSuccess,
  management,
  favorites,
  liked,
  setLiked,
}) {
  const [disabled, setDisabled] = useState({});
  const [onChanging, setOnChanging] = useState({});
  const [notes, setNotes] = useState("");
  const [updateCharacters, setUpdateCharacters] = useState([]);
  const searchCharacter = search?.toLowerCase() || "";
  const ref = useRef([]);

  const filteredCharacters = useMemo(() => {
    return (paginatedCharacters || []).filter(
      (character) =>
        !(favorites || []).some(
          (favorite) =>
            favorite.name.toLowerCase() === character.name.toLowerCase(),
        ),
    );
  }, [paginatedCharacters, favorites]);

  async function createFavorites(character) {
    setIsLoading(true);

    const result = await Services.create(character);

    setIsLoading(false);
    setHasSuccess(true);
    successTimeOut();
    return result;
  }

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

  useEffect(() => {
    setUpdateCharacters(
      paginatedCharacters.filter(
        (character) =>
          !(favorites || []).some(
            (favorite) =>
              favorite.name.toLowerCase() === character.name.toLowerCase(),
          ),
      ),
    );
    setLiked({});
  }, [paginatedCharacters, favorites]);

  return (
    <div className="main-container-cards">
      {loading ? (
        <Skeleton />
      ) : (
        (management ? filteredCharacters : favorites || [])
          .filter((character) =>
            character?.name?.toLowerCase().includes(searchCharacter),
          )
          .map((character, index) => {
            const isLiked = liked[index];
            const isChanging = onChanging[index];

            return (
              <div className="container-cards" key={index}>
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
                            setLiked((prev) => ({ ...prev, [index]: false }))
                          }
                        />
                      ) : (
                        management && (
                          <MdFavoriteBorder
                            className="heart-icon-card"
                            size={20}
                            onClick={() =>
                              setLiked((prev) => ({ ...prev, [index]: true }))
                            }
                          />
                        )
                      )}
                      {!management && (
                        <MdDelete className="trash-icon-card" size={20} />
                      )}
                    </div>
                  </nav>

                  <textarea
                    type="text"
                    className="box"
                    ref={(el) => {
                      ref.current[index] = el;
                    }}
                    placeholder={
                      !management ? character.notes : GENDER[character.gender]
                    }
                    disabled={disabled[index] ?? true}
                    onChange={(event) => {
                      const value = event.target.value;

                      setNotes(value);
                      setOnChanging((prev) => ({ ...prev, [index]: true }));
                    }}
                  />

                  {isChanging && management ? (
                    <div className="actions-container">
                      <button
                        type="button"
                        className="btn-card"
                        onClick={async () => {
                          if (!isLiked) {
                            setHasError(true);

                            errorTimeOut();
                            return;
                          }

                          const createCharacter = {
                            character_id: crypto.randomUUID(),
                            name: character.name,
                            notes: notes,
                            created_at: new Date().toISOString(),
                            is_favorite: isLiked,
                          };

                          setDisabled((prev) => ({ ...prev, [index]: true }));
                          setOnChanging((prev) => ({
                            ...prev,
                            [index]: false,
                          }));

                          await createFavorites(createCharacter);
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
                            [index]: false,
                          }));
                          setDisabled((prev) => ({ ...prev, [index]: true }));
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
                          setDisabled((prev) => ({ ...prev, [index]: false }));

                          setTimeout(() => {
                            ref.current[index].focus();
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
                        onClick={() => {
                          if (notes == "") {
                            setHasError(true);

                            errorTimeOut();
                            return;
                          }

                          const createCharacter = {
                            character_id: crypto.randomUUID(),
                            name: character.name,
                            notes: notes,
                            created_at: new Date().toISOString(),
                            is_favorite: isLiked,
                          };

                          setDisabled((prev) => ({ ...prev, [index]: true }));
                          setOnChanging((prev) => ({
                            ...prev,
                            [index]: false,
                          }));
                          // updateFavorites(createCharacter);
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
                            [index]: false,
                          }));
                          setDisabled((prev) => ({ ...prev, [index]: true }));
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
                          setDisabled((prev) => ({ ...prev, [index]: false }));

                          setTimeout(() => {
                            ref.current[index].focus();
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
          })
      )}
    </div>
  );
}

export { Cards };
