import "../../../global-css/global.css";
import "./styles/styles.css";
import { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { Services } from "../../../services/Services";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { Error } from "../Erorrs/Errors.jsx";
import { Success } from "../Success/Success.jsx";
import { DataNotFound } from "../DataNotFound/DataNotFound.jsx";


function Management({ favorites }) {
  const [imageView, setImageView] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [liked, setLiked] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const management = location.pathname === "/ManagementPage";

  function handleNavigation() {
    navigate("/FavoritesPage");
  }

  function handleNavigationBack() {
    navigate("/ManagementPage");
  }

  async function loadCharacters(page) {
    setIsLoading(true);

    const result = await Services.proxyGetAllPaged(page);

    setPaginatedCharacters(result || []);

    setIsLoading(false);
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

  useEffect(() => {
    loadCharacters(page);
    setLiked(false);
  }, [page]);

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
            onClick={() => {
              setSearchValue(search);
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
            search={searchValue}
            paginatedCharacters={paginatedCharacters}
            loading={loading}
            setIsLoading={setIsLoading}
            setHasError={setHasError}
            setHasSuccess={setHasSuccess}
            management={management}
            favorites={favorites}
            liked={liked}
            setLiked={setLiked}
          />
        )}

        <footer className="footer">
          <div className="pagination-container">
            <MdChevronLeft
              className="pagination-icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
            <p className="page-number">Página {page}</p>
            <MdChevronRight
              className="pagination-icon"
              onClick={() => setPage((prev) => Math.min(prev + 1, 9))}
            />
          </div>
        </footer>
      </main>

      {hasError && (
        <Error
          error={
            management
              ? "Clique em favoritar antes de salvar!"
              : "Adicione uma nota antes de salvar!"
          }
          hasError={hasError}
        />
      )}

      {hasSuccess && (
        <Success
          success={"Personagem salvo com sucesso!"}
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
