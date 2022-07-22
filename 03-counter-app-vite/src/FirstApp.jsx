import PropTypes from 'prop-types';

const newMessage = [1,2,3,4,5,6,7,8,9];

export const FirstApp = ( {title} ) => {
    return (
        <>
            <h1> {title} </h1>
        </>
    );
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    // subtitle: PropTypes.number.isRequired,
}

FirstApp.defaultProps = {
    title: 'No hay título',
    // subtitle: 'No hay sub título'
}