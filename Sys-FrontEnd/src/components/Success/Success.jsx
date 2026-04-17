import "../../../global-css/global.css";
import "./styles/styles.css";

import { MdCheck } from "react-icons/md";

function Success({ success, hasSuccess }) {
  return (
    <div
      className="success-wrapper"
      style={{
        animation: hasSuccess
          ? "slideSuccessUp 0.5s ease-out forwards"
          : "slideSuccessDown 1.2s ease-in forwards",
      }}
    >
      <MdCheck size={20} color="var(--primary)" />
      <p className="success">{success}</p>
    </div>
  );
}

export { Success };
