import { useContext } from 'react';
import { Loading } from '../components';
import { PlacesContext } from '../context';

export const HomeScreen = () => {

    const { isLoading, userLocation } = useContext(PlacesContext);

    if (isLoading) {
        return <Loading />
    }

	return (
		<div>
            {
                userLocation?.join(',')
            }
		</div>
	);
};
