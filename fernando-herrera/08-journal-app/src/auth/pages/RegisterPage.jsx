import { Link, Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

// Estado inicial del formulario
const formData = {
	email: '',
	password: '',
	displayName: '',
};

// Estado inicial del formValidations
const formValidations = {
	email: [(value) => value.includes('@'), 'El correo debe tener una @'],
	password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
	displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {
	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	// Estado para identificar si el formulario ha sido enviado
	const [formSubmitted, setformSubmitted] = useState(false);

	// A hook to access the redux store's state
    // Accede a los valores de las propiedades status y errorMessage
    const { status, errorMessage } = useSelector((state) => state.auth);

    // Hook que guarda valor booleano y valida nuevamente cada que estado de status cambie
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

	// Custom hook para obtener y modificar el estado de las propiedades del objeto
	const {
		formState,
		displayName,
		email,
		password,
		onInputChange,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	const onSubmit = (event) => {
		event.preventDefault();
		// Indica que el formulario ha sido enviado
		setformSubmitted(true);

		if (!isFormValid) return;

		// Ejecuta metodo definido en thunks donde envia la peticion para loguearse en firebase
		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<AuthLayout title="Crear Cuenta">
			<form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Nombre completo"
							fullWidth
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								disabled={isCheckingAuthentication}
								type="submit"
								variant="contained"
								fullWidth
							>
								Crar cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
