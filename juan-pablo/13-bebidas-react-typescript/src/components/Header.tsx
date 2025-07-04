import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';

export const Header = () => {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: '',
    })

    const { pathname } = useLocation();

    const isHome = useMemo(() => pathname === '/', [pathname]);

    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    const showNotification = useAppStore((state) => state.showNotification);


    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handlesChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        // Validar
        if(Object.values(searchFilters).includes('')) {
            // Mostrar un error
            console.error('Todos los campos son obligatorios');
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true,
            });            
            return;
        }

        // Buscar recetas
        searchRecipes(searchFilters);
    
    }

    return (
        <header
            className={
                isHome
                    ? "bg-[url('/bg.jpg')] bg-cover bg-center h-screen"
                    : 'bg-slate-800'
            }
        >
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-orange-500 uppercase font-bold'
                                    : 'text-white uppercase font-bold'
                            }
                        >
                            Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o ingrediente
                            </label>
                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg bg-white"
                                placeholder="Nombre o Ingredientes. Ej: Tequila, Vodka..."
                                value={searchFilters.ingredient}
                                onChange={handlesChange}
                            />
                        </div>

                        <div className="space-y-5 mt-5">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoría
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg bg-white"
                                value={searchFilters.category}
                                onChange={handlesChange}
                            >
                                <option value="">
                                    -- Selecciona una categoría --
                                </option>

                                {categories.drinks.map((category) => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg mt-5 uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    );
};
