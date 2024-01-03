import { useForm } from '../hooks/useForm';

export const FormWithCustomHook = () => {
	const { formState, onInputChange, onResetForm, username, email, password } = useForm({
		username: '',
		email: '',
		password: '',
	});

	// const {username, email, password} = formState;

	return (
		<div className="formulario">
			<h1>Formulario Simple</h1>
			<hr />

			<div className="campo">
				<input
					type="text"
					placeholder="Username"
					value={username}
					name="username"
					onChange={onInputChange}
				/>
			</div>

			<div className="campo">
				<input
					type="email"
					placeholder="Email"
					value={email}
					name="email"
					onChange={onInputChange}
				/>
			</div>

			<div className="campo">
				<input
					type="password"
					placeholder="Contraseña"
					value={password}
					name="password"
					onChange={onInputChange}
				/>
			</div>

			<button onClick={onResetForm}>Reset</button>
		</div>
	);
};
