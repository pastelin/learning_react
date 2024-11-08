import { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

	// Memoriza la lista de heroes y solo se volvera a ejecutar cuando cambie el estado de publisher
	const heroes = useMemo( () => getHeroesByPublisher(publisher), publisher );

	return (
		<div className="row rows-cols-1 row-cols-md-3 g-3">
			{
			heroes.map(
				(hero) => (
					<HeroCard 
						key={hero.id}
						{...hero} // Uso de spread para enviar todas las propiedaes al componente HeroCard
					/>
				))
			}
		</div>
	);
};
