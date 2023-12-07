export const getEnvVariables = () => {
    // La siguiente linea causa error al ejecutar yarn build
    // import.meta.env;

    return {
        // ...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
    }
}