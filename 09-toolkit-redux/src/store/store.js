import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter';
import { pokemonSlice } from './slices/pokemon';
import { todosApi } from './apis';


export const store = configureStore({
    reducer: {
        // Define los slice a utilizar
        // El primer valor sera el nombre identificador del estado del reducer, puede ser cualquier nombre
        // El segundo valor es el Slice al que se hara referencia
        // NOTA: el slice.reducer hara referencia a los valores del estado definidio en cada uno es estos
        counter: counterSlice.reducer,
        pokemons: pokemonSlice.reducer,

        [todosApi.reducerPath]: todosApi.reducer,
    },
    // middleware es una funcion que se ejecuta antes que otra
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)
});
