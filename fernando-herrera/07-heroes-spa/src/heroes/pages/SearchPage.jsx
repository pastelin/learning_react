import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
	// Hook para obtener el estado de la navegacion
	const navigate = useNavigate();

	// Hook que obtiene informacion de la ubicacion o localizacion de donde nos encontramos
	const location = useLocation();

	// Paquete que obtiene un objeto de los parametros enviados por query param
	const { q = '' } = queryString.parse(location.search);

	const heroes = getHeroesByName(q);

	const showSearch = q.length === 0;

	const showError = q.length > 0 && heroes.length === 0;

	// Custom hook para manipular el estado de las propiedades del formulario
	const { searchText, onInputChange } = useForm({
		searchText: q,
	});

	// Funcion que se ejecuta cuando el hace submit del formulario
	const onSearchSubmit = (event) => {
		event.preventDefault();

		// if(searchText.trim().length <= 1) return;

		// Navega a la ruta actual agregando los parametros indicados
		navigate(`?q=${searchText}`);
		console.log({ searchText });
	};

	return (
		<>
			<h1>Search</h1>
			<hr />

			<div className="row">
				<div className="col-5">
					<h4>Searching</h4>
					<hr />

					<form onSubmit={onSearchSubmit} aria-label="form">
						<input
							type="text"
							placeholder="Search a hero"
							className="form-control"
							name="searchText"
							autoComplete="off"
							value={searchText}
							onChange={onInputChange}
						/>

						<button className="btn btn-outline-primary mt-2">Search</button>
					</form>
				</div>

				<div className="col-7">
					<h4>Results</h4>
					<hr />

					<div
						className="alert alert-primary animate__animated animate__fadeIn"
                        style={{ display: showSearch ? '' : 'none' }}
                        aria-label="show-hero"
					>
						Search a hero
					</div>

					<div
						className="alert alert-danger animate__animated animate__fadeInLeft"
                        style={{ display: showError ? '' : 'none' }}
                        aria-label="alert-no-hero"
					>
						No hero with <b>{q}</b>
					</div>

					{heroes.map((hero) => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</>
	);
};
