export const GifItem = ({ title, url }) => {
	return (
		<div className="card-item">
			<div className='card-image'>
				<img src={url} alt={title} />
			</div>
			<p>{title}</p>
		</div>
	);
};
