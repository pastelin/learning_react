/* eslint-disable react/prop-types */
import { UserForm } from './UserForm';

export const UserModalForm = ({
	userSelected,
	initialUserForm,
	handlerAddUser,
	handlerCloseForm,
}) => {
	return (
		<>
			<div className="overlay animacion fadeIn">
				<div className="overlay-container">
					<h5>{userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios</h5>

					<UserForm
						handlerAddUser={handlerAddUser}
						userSelected={userSelected}
						initialUserForm={initialUserForm}
						handlerCloseForm={handlerCloseForm}
					/>
				</div>
			</div>
		</>
	);
};
