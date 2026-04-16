import "../../../global-css/global.css";
import { useEffect, useState } from "react";
import { Management } from "../Management/Management";
import { Error } from "../Erorrs/Errors";
import { Services } from "../../../services/Services";
import { DataNotFound } from "../DataNotFound/DataNotFound";

function Favorites() {
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [favorites, setFavorites] = useState([]);

  async function loadCharactersFavorites({ page, pageSize }) {
    setIsLoading(true);
    const result = await Services.getAll({ page, pageSize });
    
    setFavorites(result || []);
    setIsLoading(false);
    return result;
  }

  useEffect(() => {
    loadCharactersFavorites({ page, pageSize });
  }, [page, pageSize]);

  return (
    <div>
      <Management favorites={favorites} />
    </div>
  );
}

export { Favorites };
