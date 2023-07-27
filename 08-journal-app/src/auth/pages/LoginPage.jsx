import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	// useSelector is A hook to access the redux store's state
	// state.auth : auth es el identificador definido en store.js
	// la propiedad status proviene del slice registrada en el store para ser accesada desde cualquier componente
	const { status, errorMessage } = useSelector((state) => state.auth);

	// A hook to access the redux dispatch function.
	// Permite ejecutar funciones definidas en Slices y Thunks
	const dispatch = useDispatch();

	const { formState, email, password, onInputChange } = useForm(formData);

	// Hook que guarda en cache un valor booleano
	// Se renderizara cuando el estado de status cambie
	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (event) => {
		event.preventDefault();
		// console.log({ email, password });

		dispatch(startLoginWithEmailPassword(formState));
	};

	const onGoogleSignIn = () => {
		console.log('onGoogleSignIn');
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form
				aria-label="submit-form"
				onSubmit={onSubmit}
				className="animate__animated animate__fadeIn animate__faster"
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							name="password"
							inputProps={{
								'data-testid': 'password',
							}}
							value={password}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								type="submit"
								variant="contained"
								fullWidth
							>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								onClick={onGoogleSignIn}
								variant="contained"
								aria-label="google-btn"
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
