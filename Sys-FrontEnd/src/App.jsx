import "../global-css/global.css";
import { Routes, Route } from "react-router-dom";
import { ManagementPage } from "../routes/ManagementPage";
import { FavoritesPage } from "../routes/FavoritesPage";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ProxyProvider } from "../context/ProxyContext";

function App() {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--color-text)",
      }}
    >
          <ProxyProvider>
        <FavoritesProvider>
            <Routes>
              <Route path="/ManagementPage" element={<ManagementPage />} />
              <Route path="/FavoritesPage" element={<FavoritesPage />} />
            </Routes>
        </FavoritesProvider>
          </ProxyProvider>
    </div>
  );
}

export { App };
