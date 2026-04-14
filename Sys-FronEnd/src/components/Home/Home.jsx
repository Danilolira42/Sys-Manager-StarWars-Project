import "../../../global-css/global.css"
import "./styles/styles.css"
import { Table } from "../Table/Table"
import { useEffect, useState } from "react";

function Home() {

  const [imageView, setImageView] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      
      const setTimeIn = setTimeout(() => {
        setImageView(true);
      }, 6000)

      const setTimeOut = setTimeout(() => {
        setIsExiting(true);
      }, 12000)

      return (() => {
        clearTimeout(setTimeIn);
        clearTimeout(setTimeOut);
      })
    }, [])

    const handleAnimationEnd = () => {
      if(isExiting){
      setImageView(false);
      }
    }

  return (
    <div className="container">
      <main className="main">
        
      <header style={{
         width: "100%",
         marginTop: "40px"
      }}>
        <h2
        className="title"
        >
          PROCURE POR UM PERSONAGEM
        </h2>
       </header>

       <label htmlFor="input" 
       className="label">
         
         Personagem
       
       </label>   

        <nav
        className="navigation"
        >
          <input
            type="text"
            className="search"
            placeholder="Digite um personagem..."
          >
          </input>

          <button
            onClick={()=> console.log("Clicou")}
            className="btn-styles"
            type="button"
          >
            PESQUISAR
          </button>
        </nav>

        <Table />
      </main>    

  {imageView && (
  <div 
    onAnimationEnd={handleAnimationEnd}
    style={{
    position: "absolute",
    bottom: "20px",
    left: "255px",   
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1000,
    animation: isExiting ? "slideDown 1.5s ease-in forwards" : "slideUp 1.5s ease-out forwards",
  }}>
    
    <style>{`
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
    }}>
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

export { Home };
