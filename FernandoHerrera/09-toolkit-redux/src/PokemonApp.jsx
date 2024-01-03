import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from './store/slices/pokemon';

export const PokemonApp = () => {
	// Crea dispatch funcion que se usara para disparar cualquier accion sin importar a que tipo de store se requiera
	const dispatch = useDispatch();

	const { page, pokemons, isLoading } = useSelector((state) => state.pokemons);

	useEffect(() => {
		// Al estar memorizado no es necesario ponerlo dentro de [] del useEffect
		dispatch(getPokemons());
	}, []);

	console.log(pokemons);

	return (
		<>
			<h1>PokemonApp</h1>
			<hr />

			<span>Loading: {isLoading ? 'True' : 'False'}</span>

			<ul>
				{pokemons.map(({name}) => (
					<li key={name}>{name}</li>
				))}
			</ul>

			<button disabled={isLoading} onClick={() => dispatch(getPokemons(page))}>
				Next
			</button>
		</>
	);
};
