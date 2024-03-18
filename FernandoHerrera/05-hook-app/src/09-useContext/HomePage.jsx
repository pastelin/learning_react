import { useContext } from 'react';
import { UserContext } from './context/userContext';

export const HomePage = () => {
	const { user, setUser } = useUsers();

	return (
		<>
			<h1>HomePage</h1>
			<hr />

			<pre aria-label="pre">{JSON.stringify(user, null, 3)}</pre>
		</>
	);
};
