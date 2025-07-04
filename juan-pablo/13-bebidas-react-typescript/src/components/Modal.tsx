import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function Modal() {
    const modal = useAppStore((state) => state.modal);
    const closeModal = useAppStore((state) => state.closeModal);
    const selectedRecipe = useAppStore((state) => state.selectedRecipe);
    const handleClickFavorite = useAppStore(
        (state) => state.handleClickFavorite
    );
    const favoriteExists = useAppStore((state) => state.favoriteExists);

    const renderIngredients = () => {
        const ingredients: JSX.Element[] = [];

        for (let i = 1; i <= 6; i++) {
            const ingredient =
                selectedRecipe[
                    `strIngredient${i}` as keyof typeof selectedRecipe
                ];
            const measure =
                selectedRecipe[`strMeasure${i}` as keyof typeof selectedRecipe];

            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className="text-gray-700 text-lg font-normal">
                        {ingredient} - {measure}
                    </li>
                );
            }
        }

        return ingredients;
    };

    return (
        <Transition appear show={modal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    closeModal();
                }}
            >
                {/* Fondo oscuro */}
                <div className="fixed inset-0 bg-black bg-opacity-70" />

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <h3 className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                {selectedRecipe.strDrink}
                            </h3>
                            <img
                                src={selectedRecipe.strDrinkThumb}
                                alt={`Imagen de ${selectedRecipe.strDrink}`}
                                className="mx-auto w-96"
                            />
                            <h3 className="text-gray-900 text-2xl font-extrabold my-5">
                                Ingredientes y Cantidades
                            </h3>
                            {renderIngredients()}

                            <h3 className="text-gray-900 text-2xl font-extrabold my-5">
                                Instrucciones
                            </h3>

                            <p className="text-gray-700 text-lg">
                                {selectedRecipe.strInstructions}
                            </p>

                            <div className="mt-5 flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeModal();
                                    }}
                                    className="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                                >
                                    Cerrar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleClickFavorite(selectedRecipe);
                                        closeModal();
                                    }}
                                    className="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                                >
                                    {favoriteExists(selectedRecipe.idDrink)
                                        ? 'Eliminar de Favoritos'
                                        : 'Agregar a Favoritos'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
