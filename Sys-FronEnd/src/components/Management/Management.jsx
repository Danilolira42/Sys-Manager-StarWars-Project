import "../../../global-css/global.css";
import "./styles/styles.css";
import { useEffect, useState } from "react";
import { Cards } from "../Cards/Cards";
import { Services } from "../../../services/Services";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

function Management() {
  const [imageView, setImageView] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [paginatedCharacters, setPaginatedCharacters] = useState([])
  const [page, setPage] = useState(1);

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
  }, [page])

  const handleAnimationEnd = () => {
    if (isExiting) {
      setImageView(false);
    }
  };

  return (
    <div className="container">
      <main className="main">
        <header
          style={{
            width: "100%",
            marginTop: "40px",
          }}
        >
          <h2 className="title">PROCURE POR UM PERSONAGEM</h2>
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

        <Cards search={searchValue} paginatedCharacters={paginatedCharacters} loading={loading} setIsLoading={setIsLoading}/>

        <footer className="footer">
          <div className="pagination-container">
            <MdChevronLeft
              className="pagination-icon"
              onClick={() => 
                setPage((prev) => Math.max(prev - 1, 1)
                )}
            />
            <p className="page-number">Página {page}</p>
            <MdChevronRight
              className="pagination-icon"
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, 9))}
            />
          </div>
        </footer>
      </main>

      {imageView && (
        <div
          onAnimationEnd={handleAnimationEnd}
          style={{
            position: "absolute",
            bottom: "20px",
            backgroundColor: "white",
            borderRadius: "var(--br)",
            left: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1000,
            animation: isExiting
              ? "slideDown 1.5s ease-in forwards"
              : "slideUp 1.5s ease-out forwards",
          }}
        >
          <style>
            {`
            @keyframes slideUp {
              from { transform: translateY(100vh); opacity: 0; }
              to { transform: translateY(0) rotate(30deg); opacity: 1; }
            }
            @keyframes slideDown {
              from { transform: translateY(0) rotate(30deg); opacity: 1; }
              to { transform: translateY(100vh); opacity: 0; }
            }
          `}
          </style>

          <div
            style={{
              backgroundColor: "#fde047",
              border: "4px solid #000",
              padding: "10px 20px",
              fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
              fontWeight: "bold",
              textTransform: "uppercase",
              boxShadow: "8px 8px 0px #000",
              display: "inline-block",
              transform: "rotate(-2deg)",
              maxWidth: "250px",
              color: "#000",
              marginBottom: "15px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px" }}>Easter egg!</p>
          </div>

          <img
            src="/images/darth-vader.png"
            alt="darth-vader"
            style={{ width: "120px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export { Management };
