import PropTypes from 'prop-types';

const newMessage = [1,2,3,4,5,6,7,8,9];

export const FirstApp = ( {title, subTitle, name} ) => {
    return (
        <>
            <h1 data-testid="test-title"> {title} </h1>
            <p>{subTitle}</p>
            <p>{subTitle}</p>
            <p>{name}</p>
        </>
    );
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    // subtitle: PropTypes.number.isRequired,
}

FirstApp.defaultProps = {
    title: 'No hay título',
    subtitle: 'No hay subtitulo'
}