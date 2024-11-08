import PropTypes from 'prop-types';
import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';

export const GifGrid = ({ category }) => {

	const {images, isLoading} = useFetchGifs(category);
	
	return (
		<section className='card'>
			<h3>{category}</h3>
			{
				isLoading && (<h2 className='loading'>Cargando...</h2>)
			}
			<div className='card-grid'>
				{
					images.map( (image) => (
						<GifItem 
							key={image.id} 
							// esta opcion permite esparcir todas las propiedades del objeto image que se enviaran al elemento
							{...image}
						/>
					))
				}
			</div>
		</section>
	);
};

GifGrid.propTypes = {
	category: PropTypes.string.isRequired,
}
