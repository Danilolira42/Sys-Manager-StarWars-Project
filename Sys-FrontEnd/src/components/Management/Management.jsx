import "../../../global-css/global.css";
import "./styles/styles.css";
import { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { Error } from "../../components/Errors/Errors.jsx";
import { Success } from "../Success/Success.jsx";
import { DataNotFound } from "../DataNotFound/DataNotFound.jsx";
import { useFavorites } from "../../../context/FavoritesContext.jsx";
import { useProxy } from "../../../context/ProxyContext.jsx";

function Management() {
  const [imageView, setImageView] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [search, setSearch] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [liked, setLiked] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, getCharacterById, page, setPage, pageSize, loading } =
    useFavorites();
  const {
    paginatedCharacters,
    proxyPage,
    setProxyPage,
    setIsLoading,
    getByName,
  } = useProxy();

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

  async function handleFilterCharacter(name) {
    await getByName(name);
  }

  async function getFavoriteById(search) {
    const character = favorites.find((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    
    if(!character) {
      console.log("Character not found!")
      return;
    }
    await getCharacterById(character.character_id);
  }

  const management = location.pathname === "/ManagementPage";

  function handleNavigation() {
    navigate("/FavoritesPage");
  }

  function handleNavigationBack() {
    navigate("/ManagementPage");
  }

  useEffect(() => {
    const setTimeIn = setTimeout(() => {
      setImageView(true);
    }, 6000);

    const setTimeOut = setTimeout(() => {
      setIsExiting(true);
    }, 12000);

    return () => {
      clearTimeout(setTimeIn);
      clearTimeout(setTimeOut);
    };
  }, []);

  const handleAnimationEnd = () => {
    if (isExiting) {
      setImageView(false);
    }
  };

  return (
    <div className="container">
      <main className="main">
        {!management && (
          <div className="favorites-header">
            <MdStar size={24} fill="gold" className="star" />
            <p>Favoritos</p>
          </div>
        )}
        <header
          className="header"
          style={{
            marginTop: !management ? "-15px" : "40px",
          }}
        >
          <h2 className="title">
            {management ? "PROCURE POR UM PERSONAGEM" : "SEUS FAVORITOS"}
          </h2>

          <button
            type="button"
            onClick={() => {
              if (management) {
                handleNavigation();
              } else {
                handleNavigationBack();
              }
            }}
            className="btn-favorite"
          >
            {!management ? "PERSONAGENS" : "FAVORITOS"}
          </button>
        </header>

        <nav className="navigation">
          <div className="label-container">
            <input
              type="text"
              className="search"
              placeholder=" "
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
              }}
            />
            <label className="label">Personagem...</label>
          </div>
          <button
            onClick={async () => {
              if (management) {
                await handleFilterCharacter(search);
              } else {
                getFavoriteById(search);
              }
            }}
            className="btn-styles"
            type="button"
          >
            PESQUISAR
          </button>
        </nav>

        {!management && favorites.length === 0 ? (
          <DataNotFound text={"Nenhuma informação para ser exibida!"} />
        ) : (
          <Cards
            paginatedCharacters={paginatedCharacters}
            loading={loading}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
            setHasSuccess={setHasSuccess}
            management={management}
            favorites={favorites}
            liked={liked}
            setLiked={setLiked}
            page={page}
            pageSize={pageSize}
            setMessage={setMessage}
            errorTimeOut={errorTimeOut}
            successTimeOut={successTimeOut}
          />
        )}

        <footer className="footer">
          <div className="pagination-container">
            <MdChevronLeft
              className="pagination-icon"
              onClick={() => {
                if (management) {
                  setProxyPage((prev) => Math.max(prev - 1, 1));
                }
                setPage((prev) => Math.max(prev - 1, 0));
              }}
            />
            <p className="page-number">
              Página {management ? proxyPage : page + 1}
            </p>
            <MdChevronRight
              className="pagination-icon"
              onClick={() => {
                if (management) {
                  setProxyPage((prev) => Math.min(prev + 1, 9));
                }
                setPage((prev) => Math.min(prev + 1, 8));
              }}
            />
          </div>
        </footer>
      </main>

      {hasError && (
        <Error
          error={
            management
              ? "Clique em favoritar e adicione uma nota antes de salvar!"
              : "Adicione uma nota antes de salvar!"
          }
          hasError={hasError}
        />
      )}

      {hasSuccess && (
        <Success
          success={message}
          hasSuccess={hasSuccess}
        />
      )}

      {imageView && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className="easter-egg"
          style={{
            animation: isExiting
              ? "slideDown 1.5s ease-in forwards"
              : "slideUp 1.5s ease-out forwards",
          }}
        >
          <div className="easter-egg-title">
            <p className="easter-phrase">Easter egg!</p>
          </div>

          <img
            src="/images/darth-vader.png"
            alt="darth-vader"
            className="darth-vader"
          />
        </div>
      )}
    </div>
  );
}

export { Management };
