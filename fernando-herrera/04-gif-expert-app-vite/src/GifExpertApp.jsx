import { useState } from 'react';
import { AddCategory, GifGrid } from './components';

export const GifExpertApp = () => {

    const [categories, setCategories] = useState([]);

	// Definicion de funcion que se enviara al componente AddCategory para ingresar una nueva busqueda
    const onAddCategory = (newCategory) => {

		if( categories.includes(newCategory) ) return;

        setCategories([newCategory, ...categories])
    }

	return (
		<main className='contenedor'>
			<header>
				<h1>GifExpertApp</h1> 
			</header>

            <AddCategory
                onNewCategory={ onAddCategory }
            />
			{
				categories.map( category => (
					<GifGrid 
						key={ category } 
						category={ category } />
				))
			}
		</main>
	);
};
