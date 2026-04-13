import "../../../global-css/global.css"
import "./styles/styles.css"
import { Table } from "../Table/Table"

function Home() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-color)",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <main
        style={{
          backgroundColor: "var(--bg-card)",
          width: "850px",
          height: "600px",
          borderRadius: "var(--br)",
          overflow: "auto",
          boxShadow: "rgba(161, 161, 161, 0.1)"
        }}
      >
      
      <header style={{
         width: "100%",
         marginTop: "40px"
      }}>
        <h2
          style={{
            color: "var(text-color)",
            margin: "0 auto",
            width: "max-content",
            textAlign: "center"
          }}
        >
          PROCURE POR UM PERSONAGEM
        </h2>
       </header>

       <label htmlFor="input" style={{
         position: "absolute",
         fontSize: "12px",
         width: "80px",
         textAlign: "center",
         marginTop: "20px",
         marginLeft: "55px",
         backgroundColor: "var(--bg-card)",
         color: "var(--color-text)"
       }}>
         
         Personagem
       
       </label>   

        <nav
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Digite um personagem..."
            style={{
              border: "0.3px solid rgba(0, 0, 0, 0.35)",
              borderRadius: "var(--br-inputs)",
              width: "550px",
              height: "35px",
              outlined: "none",
              paddingLeft: "10px"
            }}
          >
          </input>

          <button
            className="btn-styles"
            type="button"
            style={{
              border: "none",
              width: "200px",
              padding: 12,
              borderRadius: "var(--br-buttons)",
              backgroundColor: "#FFE81F",
              cursor: "pointer",
            }}
          >
            PESQUISAR
          </button>
        </nav>
        <Table />
      </main>
    </div>
  );
}

export { Home };
