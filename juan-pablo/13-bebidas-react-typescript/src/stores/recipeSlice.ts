import { StateCreator } from 'zustand';
import {
    getCategories,
    getRecipeById,
    getRecipes,
} from '../services/RecipeService';
import { Categories, Drink, Drinks, Recipe } from '../types';
import { SearchFilter } from '../types/index';

export type RecipesSliceType = {
    categories: Categories;
    drinks: Drinks;
    selectedRecipe: Recipe;
    modal: boolean;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
    selectRecipe: (id: Drink['idDrink']) => Promise<void>;
    closeModal: () => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: [],
    },
    drinks: {
        drinks: [],
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories,
        });
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters);
        set({
            drinks,
        });
    },

    selectRecipe: async (id) => {
        // Implement the logic to select a recipe
        const selectedRecipe = await getRecipeById(id);
        set({
            selectedRecipe,
            modal: true,
        });
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe,
        });
    },
});
