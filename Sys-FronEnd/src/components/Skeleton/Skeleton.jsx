import "./styles/styles.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function Skeleton() {
  return (
    <div className="main-container-cards-skeleton">
      {[...Array(6)].map((_, index) => {
        return (
            <div className="container-cards-skeleton" key={index}>
              <div className="card-skeleton">
                <nav className="card-navigation-skeleton">
                  <h2 className="title-card-skeleton">{"Carregando..."}</h2>
                  <div className="icons-container-skeleton">
                    <MdFavoriteBorder
                      className="heart-icon-card-skeleton"
                      size={20}
                    />
                    <MdDelete className="trash-icon-card-skeleton" size={20} />
                  </div>
                </nav>
                <textarea
                  type="text"
                  className="box-skeleton"
                  placeholder="Carregando..."
                />
                <button type="button" className="btn-card-skeleton">
                  <MdEdit className="icon-edit-card-skeleton" /> Editar
                </button>
              </div>
            </div>
        );
      })}
    </div>
  );
}

export { Skeleton };
