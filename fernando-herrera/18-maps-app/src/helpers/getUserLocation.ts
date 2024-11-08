export const getUserLocation = async (): Promise<[number, number]> => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log(coords);
				resolve([coords.longitude, coords.latitude]);
			},
			(err) => {
				alert('No se pudo obtner la geolocalización');
				console.log(err);
				reject();
			}
		);
	});
};
