import axios from 'axios';

// Permite crear configuracion estandar para no repetir codigo
export const pokemonApi = axios.create({
	baseURL: 'https://pokeapi.co/api/v2'
});