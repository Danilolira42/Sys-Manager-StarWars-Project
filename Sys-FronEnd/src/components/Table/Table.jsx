import { useState } from "react";
import "../../../global-css/global.css";
import "../Table/styles/styles.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
function Table() {

const [liked, setLiked] = useState(false);
const [edit, setEdit] = useState(false);


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={1}>Nome</th>
            <th colSpan={2}>Notas</th>
            <th colSpan={3}>Data de Criação</th>
            <th colSpan={4}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={1}>
              <div className="input-container">
                <input className="input" type="text" value={"Danilo"} />
                <MdEdit className="icon-edit" onClick={() => setEdit(true)}/>
              </div>
              
            </td>

            <td colSpan={2}>
              <div className="input-container">
                <input className="input" type="text" value={"São Paulo"} />
                <MdEdit className="icon-edit" />
              </div>
            </td>

            <td colSpan={3}>
              <div className="input-container">
                <input className="input" type="text" value={"20/11/2026"} />
                <MdEdit className="icon-edit" />
              </div>
            </td>

            <td colSpan={4} className="actions">
              
              {liked ?
              
              <MdFavorite className="heart-icon" color="#000" size={20} fill="red" onClick={() => setLiked(false)}/> :

              <MdFavoriteBorder className="heart-icon" color="#000" size={20} onClick={() => setLiked(true)}/>
              
              }
            <MdDelete className="trash-icon" size={20}/>
            </td>
          </tr>
        </tbody>

        {/* <tfoot>
          <tr>
            <td>
              <MdChevronLeft className="pagination-icon" />
              <p className="page-number">1</p>
              <MdChevronRight className="pagination-icon" />
            </td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export { Table };