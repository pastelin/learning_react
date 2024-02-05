import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	return (
		<>
			<nav className="nav flex-responsive aling-y-center">
				<h3>Cart App</h3>
				<div>
					<NavLink className={''} to="/">
						Home
					</NavLink>
					<NavLink className={''} to="/catalog">
						Catalog
					</NavLink>
					<NavLink className={''} to="/cart">
						Cart
					</NavLink>
				</div>
			</nav>
		</>
	);
};
