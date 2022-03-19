
const getImagen = async() => {
    
    const apiKey = 'n1s3cVyUt1mxtiVCkzirrwCNo3hxbyw1';
    const resp = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
    const { data } = await resp.json();
    const { url } = data.images.original;

    const img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

getImagen();