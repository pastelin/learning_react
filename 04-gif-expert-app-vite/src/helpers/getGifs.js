export const getGifs = async(category) => {

	const url =`https://api.giphy.com/v1/gifs/search?api_key=LkLNLBvXCxLaDSoWnqv4fAwR09FE27D9&q=${category}&limit=12`;
	const resp = await fetch( url );
	const { data } = await resp.json();

	// Genera un nuevo objeto con los parametros requeridos
	// Reemplaza el uso de { return {...} } por ( {...} )
	const gifs = data.map( img => ({
		id: img.id,
		title: img.title,
		url: img.images.downsized_medium.url
	}));
	
	return gifs;
}