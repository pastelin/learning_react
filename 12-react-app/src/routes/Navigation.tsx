import { Suspense } from 'react';
import { BrowserRouter, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';

import logo from '../logo.svg';


export const Navigation = () => {
    return (
        // Suspense : indica a react que al cargar un componente espere pero en lo que carga realiza una accion
		<Suspense fallback={<span>Loading...</span>}>
			<BrowserRouter>
				<div className="main-layout">
					<nav>
						<img src={logo} alt="React Logo" />

						<ul>
							{/* Utiliza el return implicito con "()" */}
							{routes.map(({ to, name }) => (
								<li key={to}>
									<NavLink
										to={to}
										className={({ isActive }) => (isActive ? 'nav-active' : '')}
									>
										{name}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<Routes>
						{routes.map(({ path, Component }) => (
							<Route key={path} path={path} element={<Component />} />
						))}

						<Route path="/*" element={<Navigate to={routes[0].to} replace />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Suspense>
	);
};
