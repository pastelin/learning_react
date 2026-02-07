import { StateCreator } from 'zustand';
import AIService from '../services/AIService';

export type AISlice = {
    recipe: string;
    isGenerating: boolean;
    generateRecipe: (prompt: string) => Promise<void>;
};

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt: string) => {
        set({ recipe: '', isGenerating: true }); // Reiniciar la receta antes de generar una nueva
        // Simulación de llamada a API
        const data = await AIService.generateRecipe(prompt);

        for await (const texPart of data) {
            set((state) => ({
                recipe: state.recipe + texPart,
            }));
        }
        set({ isGenerating: false });
    },
});
