import { streamText } from 'ai';
import { openrouter } from '../lib/ai';

export default {
    async generateRecipe(prompt: string, retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                const result = streamText({
                    model: openrouter('google/gemma-3n-e4b-it:free'),
                    prompt,
                    // system: 'Eres un asistente que genera recetas de bebidas basadas en los ingredientes proporcionados por el usuario. Proporciona instrucciones claras y concisas.',
					temperature: 1,
                });
                return result.textStream;
            } catch (error: unknown) {
                if (
                    error instanceof Error &&
                    'status' in error &&
                    (error as Error & { status: number }).status === 429 &&
                    i < retries - 1
                ) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, Math.pow(2, i) * 1000),
                    );
                    continue;
                }
                throw error;
            }
        }
    },
};
