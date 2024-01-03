import PropTypes from 'prop-types';
import { Title } from './Title';
import { UserDetails } from './UserDetails';
import { Book } from './Book';

export const HellorWorldApp = ({ user, id, title, book }) => {
	// const name = 'Pepe';

	return (
		<>
			<Title title={title} />

            <UserDetails user={user} id={id} />
            
			<Book book={book} />
		</>
	);
};

HellorWorldApp.protoTypes = {
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	user: PropTypes.object,
};

HellorWorldApp.defaultProps = {
	title: 'Hola mundo por defecto',
	book: 'UML got a gota',
};
