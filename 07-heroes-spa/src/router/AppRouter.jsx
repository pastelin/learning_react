import { Route, Routes } from 'react-router-dom';
import { HeroesRoutes } from '../heroes';
import { LoginPage } from '../auth/pages/LoginPage';
import { PrivateRoute } from '../heroes/routes/PrivateRoute';
import { PublicRoute } from '../heroes/routes/PublicRoute';

export const AppRouter = () => {
	return (
		<>

			<Routes>

				<Route path='login' element={
					<PublicRoute>
						<LoginPage />
					</PublicRoute>
				}/>

				<Route path="login" element={<LoginPage />} />

				{/* Definicion de rutas privadas */}
				<Route path="/*" element={
					<PrivateRoute>
						<HeroesRoutes />
					</PrivateRoute>
				}/>
			</Routes>
		</>
	);
};
