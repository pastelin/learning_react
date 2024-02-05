import PropTypes from 'prop-types';

export const ClientView = ({ title, client }) => {
	const {
		name: nameClient,
		lastName,
		address: { country, city, street, number },
	} = client;

	return (
		<>
			<h3>{title}</h3>
			<ul className="list-group">
				<li className="active">
					{nameClient} {lastName}
				</li>
				<li>
					{country} / {city}
				</li>
				<li>
					{street} {number}
				</li>
			</ul>
		</>
	);
};

ClientView.propTypes = {
	title: PropTypes.string.isRequired,
	client: PropTypes.object.isRequired,
};
