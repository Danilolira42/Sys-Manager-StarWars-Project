import "../../../global-css/global.css";
import "./styles/styles.css";

import { MdError } from "react-icons/md";

function Error ({error, hasError}) {
    return (
            <div className="error-wrapper" style={{
                animation: hasError ? "slideErrorUp 0.5s ease-out forwards" : 
                    "slideErrorDown 1.2s ease-in forwards"                
            }}>
                    <MdError size={20} color="white"/>                
                    <p className="error">{error}</p>
            </div>
    )
}

export { Error }
