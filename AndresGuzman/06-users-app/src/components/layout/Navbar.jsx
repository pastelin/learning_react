/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export const Navbar = ({ login, handlerLogout }) => {
	return (
		<>
			<nav className="nav flex-responsive align-center justify-sb">
				<div className="flex-responsive align-center">
					<h3>Users App</h3>
					<div>
						<NavLink to="/users">Usuarios</NavLink>
						<NavLink to="/users/register">Registrar Usuario</NavLink>
					</div>
				</div>
				<div>
                    <a>{ login.user.username }</a>
					<button className="btn btn-outline-red" onClick={handlerLogout}>
						Logout
					</button>
				</div>
			</nav>
		</>
	);
};
