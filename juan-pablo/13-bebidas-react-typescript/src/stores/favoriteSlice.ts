import { StateCreator } from 'zustand';
import { Recipe } from '../types';
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExists: (id: Recipe['idDrink']) => boolean;
    loadFromStorage: () => void;
};

// Se configura StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> para poder acceder a los métodos de FavoritesSliceType y NotificationSliceType en el store de Zustand.
// Esto permite que el slice de favoritos pueda interactuar con las notificaciones, como mostrar mensajes cuando se agrega o elimina una receta de favoritos.
// Esto es útil para mantener la lógica de notificaciones separada del manejo de favoritos, pero aún así permite que ambos slices trabajen juntos de manera efectiva.
export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (
    set,
    get,
    api // Add 'api' parameter to the function
) => ({
    favorites: [],

    handleClickFavorite: (recipe: Recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            // If the recipe is already in favorites, remove it
            set({
                favorites: get().favorites.filter(
                    (fav) => fav.idDrink !== recipe.idDrink
                ),
            });
            createNotificationSlice(set, get, api).showNotification({
                text: 'Receta eliminada de favoritos',
                error: false,
            });
        } else {
            // If the recipe is not in favorites, add it
            set({
                favorites: [...get().favorites, recipe],
            });
            createNotificationSlice(set, get, api).showNotification({
                text: 'Receta agregada a favoritos',
                error: false,
            });
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExists: (id) => {
        return get().favorites.some((fav) => fav.idDrink === id);
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({ favorites: JSON.parse(storedFavorites) });
        }
    },
});
