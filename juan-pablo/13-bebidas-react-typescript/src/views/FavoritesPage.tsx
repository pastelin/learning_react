import { useMemo } from 'react';
import { DrinkCard } from '../components/DrinkCard';
import { useAppStore } from '../stores/useAppStore';

const FavoritesPage = () => {
    const favorites = useAppStore((state) => state.favorites);
    const hasFavorites = useMemo(() => favorites.length, [favorites]);

    return (
        <>
            <h1 className="text-6xl font-extrabold mb-7">Favoritos</h1>

            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
                    {favorites.map((recipe) => (
                        <DrinkCard key={recipe.idDrink} drink={recipe} />
                    ))}
                </div>
            ) : (
                <p className="text-2xl text-center my-10">
                    No hay favoritos aún
                </p>
            )}
        </>
    );
};

export default FavoritesPage;