import { useEffect } from 'react';
import { useState } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
	const [formState, setFormState] = useState({
		username: 'strider',
		email: 'juan@google.com',
	});

	const { username, email } = formState;

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	useEffect(() => {
		// console.log('useEffect called!');
	}, []);

	useEffect(() => {
		// console.log('formState changed!');
	}, [formState]);

	useEffect(() => {
		// console.log('email changed!');
	}, [email]);

	return (
		<div className="formulario">
			<h1>Formulario Simple</h1>
			<hr />

			<div className="campo">
				<input type="text" value={username} name="username" onChange={onInputChange} />
			</div>

			<div className="campo">
				<input type="email" value={email} name="email" onChange={onInputChange} />
			</div>

			{username === 'strider2' && <Message />}
		</div>
	);
};
