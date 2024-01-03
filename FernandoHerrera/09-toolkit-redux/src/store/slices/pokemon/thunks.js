import { pokemonApi } from '../../../api/pokemonApi';
import { setPokemons, startLoadingPokemons } from './pokemonSlice';

export const getPokemons = (page = 0) => {
    // Primer parametro sirve para hacer dispatch de otra acción
    // Segundo parametro usado para traer todo el rootstate
    return async (dispatch, getState) => {
        
        // Ejecuta funcion del reducer indicado dentro del Slice
        dispatch(startLoadingPokemons());

        // TODO: realizar peticion http
        // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`);
        // const data = await resp.json();
        const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=${page * 10}`);
        
        dispatch(setPokemons({ pokemons: data.results, page: page + 1 }));
    }
}