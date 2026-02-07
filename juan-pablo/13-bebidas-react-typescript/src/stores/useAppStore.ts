import { create } from 'zustand';
import { createRecipesSlice, RecipesSliceType } from './recipeSlice';
import { devtools } from 'zustand/middleware';
import { createFavoritesSlice, FavoritesSliceType } from './favoriteSlice';
import {
    createNotificationSlice,
    NotificationSliceType,
} from './notificationSlice';
import { AISlice, createAISlice } from './aiSlice';

export const useAppStore = create<
    RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice
>()(
    devtools((...a) => ({
        ...createRecipesSlice(...a),
        ...createFavoritesSlice(...a),
        ...createNotificationSlice(...a),
        ...createAISlice(...a),
    }))
);
