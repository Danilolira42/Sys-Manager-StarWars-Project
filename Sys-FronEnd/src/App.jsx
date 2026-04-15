import "../global-css/global.css"
import { Management } from "./components/Management/Management"

function App() {
  return (
    <div style={{
      backgroundColor: "var(--bg-color)",
      color: "var(--color-text)",
    }}>
      <Management />
    </div>
  );
}

export { App };
