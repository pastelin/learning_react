export const GifGridItem = ( { id, title, url } ) => {

    console.log();

    return (
        <div className="card animate__animated animate__bounce">
            <img src={ url } alt={ title } />
            <p>{ title }</p>
        </div>
    )

}