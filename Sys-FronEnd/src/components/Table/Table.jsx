import "../../../global-css/global.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

function Table() {
  return (
    <div>
      <table
        style={{
          width: "100%",
          height: "max-content",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr
            style={{
              width: "100%",
              display: "flex",
              alignContent: "center",
              justifyItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <th
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              Nome
            </th>
            <th
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              Notas
            </th>
            <th
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              Data de Criação
            </th>
          </tr>
        </thead>

        <tbody
          style={{
            height: "300px",
          }}
        >
          <tr
            style={{
              width: "100%",
              display: "flex",
              alignContent: "center",
              justifyItems: "center",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <td
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              Danilo
              <MdEdit />
            </td>
            <td
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              25
              <MdEdit />
            </td>
            <td
              style={{
                width: "200px",
                height: "max-content",
              }}
            >
              São Paulo
              <MdEdit />
            </td>
            <td>
              <MdFavorite />
              <MdDelete />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Table };
