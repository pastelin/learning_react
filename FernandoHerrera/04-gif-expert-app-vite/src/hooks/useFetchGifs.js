import { useState, useEffect } from 'react';
import { getGifs } from '../helpers/getGifs';

// Hook personalizado encargado de obtener lista de imagenes 
// Y valor de Loading
export const useFetchGifs = (category) => {

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

	const getImages = async() => {
		const newImages = await getGifs(category);
		setImages(newImages);
        setIsLoading(false);
	}

    // Hook que solo se ejecuta cuando el estado cambia
	useEffect( () => {
		getImages();
	}, [] );
 
    // Retorna los valores requeridos
    // Simplifica el uso de images: images a images, debido a que la 
    // propiedad y el valor tienen el mismo nombre
    return {
        images,
        isLoading
  }
}
