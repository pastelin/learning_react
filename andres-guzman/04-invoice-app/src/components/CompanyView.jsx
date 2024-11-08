import PropTypes from 'prop-types';

export const CompanyView = ({ title, company }) => {
	return (
		<>
			<h3>{title}</h3>
			<ul className="list-group">
				<li className="active">{company.name}</li>
				<li>{company.fiscalNumber}</li>
			</ul>
		</>
	);
};

CompanyView.propTypes = {
	title: PropTypes.string.isRequired,
	company: PropTypes.object.isRequired,
};
