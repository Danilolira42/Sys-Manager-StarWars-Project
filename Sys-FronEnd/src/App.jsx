import "../global-css/global.css"
import { Home } from "./components/Home/Home"

function App() {
  return (
    <div style={{
      backgroundColor: "var(--bg-color)",
      color: "var(--color-text)",
    }}>
      <Home />
    </div>
  );
}

export { App };
