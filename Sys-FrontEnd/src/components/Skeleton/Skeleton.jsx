import "./styles/styles.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { LoadSpinner } from "../Skeleton/LoadSpinner.jsx";

function Skeleton() {
  return (
    <div className="main-container-cards-skeleton">
      {[...Array(6)].map((_, index) => {
        return (
          <div className="container-cards-skeleton" key={index}>
            <div className="card-skeleton">
              <nav className="card-navigation-skeleton">
                <h2 className="title-card-skeleton"></h2>
                <div className="icons-container-skeleton">
                  <LoadSpinner />
                </div>
              </nav>
              <textarea
                type="text"
                className="box-skeleton"
                placeholder="Carregando..."
              />
              <button type="button" className="btn-card-skeleton">
                <LoadSpinner />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Skeleton };
