import "../global-css/global.css";
import { Management } from "./components/Management/Management";
import { Routes, Route } from "react-router-dom";
import { ManagementPage } from "../routes/ManagementPage";
import { FavoritesPage } from "../routes/FavoritesPage";

function App() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--color-text)",
      }}
    >
      <Routes>
        <Route path="/ManagementPage" element={<ManagementPage />} />
        <Route path="/FavoritesPage" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export { App };
