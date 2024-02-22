/* eslint-disable react/prop-types */
import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList';

export const UsersPage = ({
	userSelected,
	users,
	initialUserForm,
	visibleForm,
	handlerAddUser,
	handlerRemoveUser,
	handlerUserSelectedForm,
	handlerCloseForm,
	handlerOpenForm,
}) => {
	
	return (
		<>
			{!visibleForm || (
				<UserModalForm
					userSelected={userSelected}
					initialUserForm={initialUserForm}
					handlerAddUser={handlerAddUser}
					handlerCloseForm={handlerCloseForm}
				/>
			)}
			<div className="container my-2">
				<h2>Users App</h2>

				<div className="flex-responsive">
					<div className="flex-responsive-item">
						{visibleForm || (
							<button className="btn btn-blue-md" onClick={handlerOpenForm}>
								Nuevo Usuario
							</button>
						)}

						{users.length === 0 ? (
							<div className="alert alert-warning">No hay usuarios en el sistema</div>
						) : (
							<UsersList
								users={users}
								handlerRemoveUser={handlerRemoveUser}
								handlerUserSelectedForm={handlerUserSelectedForm}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
