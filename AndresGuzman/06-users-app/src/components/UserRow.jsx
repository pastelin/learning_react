/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export const UserRow = ({ handlerRemoveUser, handlerUserSelectedForm, id, username, email }) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{username}</td>
			<td>{email}</td>
			<td>
				<button
					className="btn btn-blue-sm"
					type="button"
					onClick={() =>
						handlerUserSelectedForm({
							id,
							username,
							email,
						})
					}
				>
					update
				</button>
			</td>
			<td>
				<NavLink className="btn btn-blue-sm" to={'/users/edit/' + id}>
					update route
				</NavLink>
			</td>
			<td>
				<button className="btn btn-red" type="button" onClick={() => handlerRemoveUser(id)}>
					remove
				</button>
			</td>
		</tr>
	);
};
