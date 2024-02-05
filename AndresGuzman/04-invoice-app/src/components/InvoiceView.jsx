import PropTypes from 'prop-types';

export const InvoiceView = ({ id, name }) => {
	return (
		<>
			<ul className="list-group">
				<li>Id: {id}</li>
				<li>Name: {name}</li>
			</ul>
		</>
	);
};

InvoiceView.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};
