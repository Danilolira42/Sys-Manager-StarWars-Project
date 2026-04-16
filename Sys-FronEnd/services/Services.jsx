import { Https, HttpsProxy } from "../https/Https";


async function getById(character_Id) {
 
  try {
    const response = await Https.get(`favorites/${character_Id}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  }
}

async function proxyGetAll(){
  try {
      const response = await HttpsProxy.get(`starwars`);
      return response.data;
  } catch (error) {
    throw console.error(error);
  } 
}

async function proxyGetAllPaged(page){
  try {
      const response = await HttpsProxy.get(`starwars/page/?page=${page}`);
      return response.data;
  } catch (error) {
    throw console.error(error);
  } 
}


async function getAll({page, pageSize}) {
  try {
    const response = await Https.get(`favorites/?page=${page}&pagesize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw console.error(error);
  }
}

async function updateById({character}) {
  try {
    const response = await Https.put(`favorites/${character_Id}`, {},
      {
        params: {
          name: character.name,
          notes: character.notes
        },
      }
    );
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

async function create(character) {
  try {
    const response = await Https.post(`favorites`, character);
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

async function deleteById(character_Id) {
  try {
    const response = await Https.delete(`favorites/${character_Id}`);
    return response.data;
  
} catch (error) {
    throw console.error(error);
  }
}

export const Services = {
    getById,
    proxyGetAll,
    proxyGetAllPaged,
    getAll,
    updateById,
    create,
    deleteById
}
