import axios from "axios";
import { Https } from "../https/Https";

const character = {
    character_Id: character_Id,
    character_name: character_name,
    character_notes: character_notes,
    created_at: created_at
}

function getById(character_Id) {
  try {
    const response = axios.get(`${Https.BASE_URL}/favorites/${character_Id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function getAll() {
  try {
    const response = axios.get(`${Https.BASE_URL}/favorites`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


function updateById(character) {
  try {
    const response = axios.put(`${Https.BASE_URL}/favorites/${character_Id}`, character);
    return response.data;
  
} catch (error) {
    console.error(error);
  }
}

function create(character) {
  try {
    const response = axios.create(`${Https.BASE_URL}/favorites`, character);
    return response.data;
  
} catch (error) {
    console.error(error);
  }
}

function deleteById(character_Id) {
  try {
    const response = axios.delete(`${Https.BASE_URL}/favorites/${character_Id}`);
    return response.data;
  
} catch (error) {
    console.error(error);
  }
}

export{
    getById,
    getAll,
    updateById,
    create,
    deleteById
}
