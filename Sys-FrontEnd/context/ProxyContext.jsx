import { createContext, useState, useEffect, useContext } from "react";
import { Services } from "../services/Services";

const ProxyContext = createContext();

export function ProxyProvider({ children }) { 
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);
  const [proxyPage, setProxyPage] = useState(1);
  const [loading, setIsLoading] = useState(false);
    
  //Carregar todos os personagens da SWAPI - Proxy
  async function loadCharacters(proxyPage) {
    setIsLoading(true);
    const result = await Services.proxyGetAllPaged(proxyPage);
    setIsLoading(false);
    
    setPaginatedCharacters((Array.isArray(result) ? result : []))
  }

  //Buscar pelo nome na SWAPI - Proxy 
  async function getByName(name){
    setIsLoading(true);
    const result = await Services.proxyGetByName(name);
    setIsLoading(false);

    setPaginatedCharacters((Array.isArray(result) ? result : []))
  }

  useEffect(() => {
    setIsLoading(true);
    loadCharacters(proxyPage);
    setIsLoading(false);
  }, [proxyPage]);

  return (
    <ProxyContext.Provider value={{ 
      paginatedCharacters, 
      setPaginatedCharacters,
      proxyPage, 
      loading, 
      setProxyPage, 
      getByName,
      setIsLoading }}>
      {children}
    </ProxyContext.Provider>
  );
}

export function useProxy() {
  return useContext(ProxyContext);
}
