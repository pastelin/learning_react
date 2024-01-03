import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
	// Custom hook para acceder a las funciones de Navigation.Provider
    const navigate = useNavigate();
    
    // Obtiene la referencia de la funcion login() definida en <AuthProvider>
	const {login} = useContext(AuthContext);


	const onLogin = () => {

		const lastpath = localStorage.getItem('lastPath') || '/';

		login('Juan Pastelin');

		navigate(lastpath, {
			replace: true,
		});
	};

	return (
		<div className="container mt-5">
			<h1>Login</h1>
			<hr />

			<button className="btn btn-primary" onClick={onLogin}>
				Login
			</button>
		</div>
	);
};
