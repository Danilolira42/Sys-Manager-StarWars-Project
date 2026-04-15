import "./styles/styles.css";
import "../../../global-css/global.css";
import { MdEdit } from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Services } from "../../../services/Services";
import { Skeleton } from "../Skeleton/Skeleton";
import { GENDER } from "../../../enums/gender.jsx";

function Cards({ search, paginatedCharacters, loading, setIsLoading }) {
  const [liked, setLiked] = useState({});
  const [disabled, setDisabled] = useState({});
  const [onChanging, setOnChanging] = useState(false);
  const [notes, setNotes] = useState("");
  const searchCharacter = search?.toLowerCase() || "";
  const ref = useRef([]);

  async function createFavorites(character) {
    setIsLoading(true);

    const result = await Services.create(character);
    console.log(result)
    setIsLoading(false);
    return result;
  }

  return (
    <div className="main-container-cards">
      {loading ? (
        <Skeleton />
      ) : (
        (paginatedCharacters || [])
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
                      {isLiked ? (
                        <MdFavorite
                          className="heart-icon-card"
                          size={20}
                          fill="red"
                          onClick={() =>
                            setLiked((prev) => ({ ...prev, [index]: false }))
                          }
                        />
                      ) : (
                        <MdFavoriteBorder
                          className="heart-icon-card"
                          size={20}
                          onClick={() =>
                            setLiked((prev) => ({ ...prev, [index]: true }))
                          }
                        />
                      )}
                      <MdDelete className="trash-icon-card" size={20} />
                    </div>
                  </nav>

                  <textarea
                    type="text"
                    className="box"
                    ref={(el) => {
                      ref.current[index] = el;
                    }}
                    placeholder={GENDER[character.gender]}
                    disabled={disabled[index] ?? true}
                    onChange={(event) => {
                      const value = event.target.value;

                      setNotes(value);
                      setOnChanging((prev) => ({ ...prev, [index]: true }));
                    }}
                  />

                  {isChanging ? (
                    <div className="actions-container">
                      <button
                        type="button"
                        className="btn-card"
                        onClick={() => {
                          const createCharacter = {
                            character_id: crypto.randomUUID(),
                            name: character.name,
                            notes: notes,
                            created_at: new Date().toISOString(),
                          };

                          createFavorites(createCharacter);
                          console.log(createCharacter);
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
