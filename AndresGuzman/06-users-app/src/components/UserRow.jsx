/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const UserRow = ({id, username, email }) => {

	const {handlerRemoveUser, handlerUserSelectedForm} = useContext(UserContext);
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
