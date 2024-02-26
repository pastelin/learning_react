/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UserForm } from './UserForm';
import { UserContext } from '../context/UserContext';

export const UserModalForm = () => {
	const { userSelected, handlerCloseForm } = useContext(UserContext);

	return (
		<>
			<div className="overlay animacion fadeIn">
				<div className="overlay-container">
					<h5>{userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios</h5>

					<UserForm userSelected={userSelected} handlerCloseForm={handlerCloseForm} />
				</div>
			</div>
		</>
	);
};
