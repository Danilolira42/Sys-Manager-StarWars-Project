import { createContext, useState, useEffect, useContext } from "react";
import { Services } from "../services/Services";
import { useProxy } from "../context/ProxyContext";
import { useLocation } from "react-router-dom";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const { setPaginatedCharacters } = useProxy();
  const location = useLocation();

  //Carregar favoritos
  async function loadCharactersFavorites({ page, pageSize }) {
    
    setIsLoading(true);
    const result = await Services.getAll({ page, pageSize });
    setIsLoading(false);

    setFavorites(Array.isArray(result) ? result : [result]);
    return result;
  }

  //Carregar favorito pelo Id
  async function getCharacterById(character_id) {
    
    setIsLoading(true);
    const result = await Services.getById(character_id);
    setIsLoading(false);

    setFavorites(Array.isArray(result) ? result : [result])
    return result;
  }

  //Criar favoritos
  async function createFavorites(character) {
    
    setIsLoading(true);
    const result = await Services.create(character);
    setIsLoading(false);
    
    setFavorites(Array.isArray(result) ? result : [result])
    setPaginatedCharacters((prev) =>
      (Array.isArray(prev) ? prev : []).filter(
        (c) => c.name.toLowerCase() !== result.name.toLowerCase(),
      ),
    );

    return result;
  }

  //Atualizar favoritos
  async function updateFavoriteCharacter(character) {
    
    setIsLoading(true);
    const result = await Services.updateById(character);
    setIsLoading(false);
    
    setFavorites((prev) => (Array.isArray(prev) ? prev : []).map((c) =>
      c.character_id === result.character_id ? { ...c, ...character } : c
    ))
    return result;
  }

  //Deletar favoritos
  async function deleteCharacter(character_id) {
    
    setIsLoading(true);
    const result = await Services.deleteById(character_id);
    setIsLoading(false);
    
    setFavorites((prev) => (Array.isArray(prev) ? prev : [result])
    .filter((c) => c.character_id !== character_id));
    return result;
  }

  useEffect(() => {
    loadCharactersFavorites({page, pageSize});
  }, [page, pageSize]);

  useEffect(() => {
    loadCharactersFavorites();
  }, [location.pathname]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        page,
        pageSize,
        setPage,
        setFavorites,
        getCharacterById,
        createFavorites,
        updateFavoriteCharacter,
        deleteCharacter,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
