import { useContext } from 'react';
import { UserContext } from './context/userContext';

export const LoginPage = () => {
	// Regresa el value del componente UserProvider
	const { user, setUser } = useContext(UserContext());

	return (
		<>
			<h1>LoginPage</h1>
			<hr />

			<pre aria-label="pre">{JSON.stringify(user, null, 3)}</pre>

			<button
				className="btn btn-primary"
				onClick={() => setUser({ id: 1234, name: 'Pedro', email: 'pedro@gmail.com' })}
			>
				Establecer usuario
			</button>
		</>
	);
};
