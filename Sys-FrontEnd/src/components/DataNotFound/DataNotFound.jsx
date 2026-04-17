import "../DataNotFound/styles/styles.css";
import "../../../global-css/global.css";

function DataNotFound({ text }) {
  return (
    <div className="data-not-found">
      <p className="data-not-found-title">{text}</p>
    </div>
  );
}

export { DataNotFound };
