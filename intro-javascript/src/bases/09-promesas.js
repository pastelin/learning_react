import { getHeroeById } from './bases/08-imp-exp';

// const promesa = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		const heroe = getHeroeById(2);

// 		reject('No se pudo encontrar el héroe');
// 	}, 2000);
// });

// promesa
// 	.then((heroe) => {
// 		console.log('Héroe', heroe);
// 	})
// 	.catch((err) => console.warn(err));

const getHeroeByIdAsync = (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {

            if(getHeroeById(id)) {
                resolve(getHeroeById(id));
            }else {
                reject('No se pudo encontrar el héroe');
            }

		}, 2000);
	});
};

getHeroeByIdAsync(1)
    .then( console.log )
    .catch( console.error );
