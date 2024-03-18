/* eslint-disable react/prop-types */
import { useUsers } from '../hooks/useUsers';
import { UserForm } from './UserForm';

export const UserModalForm = () => {
	const { userSelected, handlerCloseForm } = useUsers();

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
