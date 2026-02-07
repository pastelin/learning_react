import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './views/IndexPage';
import { Layout } from './layouts/Layout';
import { lazy, Suspense } from 'react';
import GenerateAI from './views/GenerateAI';

// Configuracion de lazy para cargar el componente de la página de favoritos
// Esto permite que el componente se cargue de forma diferida, mejorando el rendimiento de la aplicación
// al evitar cargar todos los componentes al inicio.
const FavoritesPage = lazy(() => import('./views/FavoritesPage'));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define the main layout for the application */}
                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage />} index />
                    {/* Use Suspense to handle the loading state while FavoritesPage is being loaded */}
                    <Route
                        path="/favoritos"
                        element={
                            <Suspense fallback={<div>Cargando...</div>}>
                                {/* Lazy load the FavoritesPage component */}
                                <FavoritesPage />
                            </Suspense>
                        }
                    />
                    <Route path="/generate" element={<GenerateAI />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
