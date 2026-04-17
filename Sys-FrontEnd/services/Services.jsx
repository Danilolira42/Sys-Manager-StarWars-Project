import { Https, HttpsProxy } from "../https/Https";

//GET ALL Proxy
async function proxyGetAll(){
  try {
    const response = await HttpsProxy.get(`starwars`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  } 
}

//GET ALL PAGINADO
async function proxyGetAllPaged(page){
  try {
    const response = await HttpsProxy.get(`starwars/page/?page=${page}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  } 
}

//GET BY Name
async function proxyGetByName(name){
  try {
    const response = await HttpsProxy.get(`starwars/characters/search?name=${name}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  } 
}

//GET BY Id
async function getById(character_id) {
 
  try {
    const response = await Https.get(`favorites/${character_id}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  }
}

//GET ALL
async function getAll({page, pageSize}) {
  try {
    const response = await Https.get(`favorites/?page=${page}&pagesize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  }
}

//UPDATE BY ID 
async function updateById(character) {
  try {
    const response = await Https.put(`favorites/${character.character_id}`, {
          character_id: character.character_id,
          name: character.name,
          notes: character.notes,
          is_favorite: character.is_favorite
        },
    );
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

//POST - Criação de character
async function create(character) {
  try {
    const response = await Https.post(`favorites`, character);
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

//DELETE BY ID
async function deleteById(character_Id) {
  try {
    const response = await Https.delete(`favorites/${character_Id}`);
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

export const Services = {
    proxyGetAll,
    proxyGetAllPaged,
    proxyGetByName,
    getById,
    getAll,
    updateById,
    create,
    deleteById,
}
