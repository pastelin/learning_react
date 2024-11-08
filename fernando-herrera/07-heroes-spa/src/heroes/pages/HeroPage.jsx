import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers';

export const HeroPage = () => {

  // Obtiene los parametros recibidos mediante path variable
  const {id} = useParams();

  // Buca al heroe por le id recibido
  // Memoriza el valor del heroe y solo se ejecuta cuando el id cambia
  const hero = useMemo( () => getHeroById(id), [id] );

  // Custom hook para acceder a las funciones y propiedades de Navigation.Provider
  const navigate = useNavigate();

  // Funcion que se encarga de redireccionar a la vista indicada
  const onNavigateBack = () => {
    // borra los datos en la navegacion actual
    // navigate('/marvel', { replace: true, });

    // Redirige a la vista anterior
    navigate(-1);
  }

  // Si el objeto es nulo regresa a la vista marvel
  if( !hero ) {
    return <Navigate to="/marvel" />
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img 
          src={`/assets/heroes/${id}.jpg`} 
          alt={ hero.superhero }
          className="img-thumbnail animate__animated animate__fadeInLeft"
          />
      </div>
      <div className="col-8">
        <h3>{ hero.superhero }</h3>
        <ul>
          <li className="list-group list-group-flush">
            <li className="list-group-item"> <b>Alter ego:</b> {hero.alter_ego} </li>
            <li className="list-group-item"> <b>Publisher:</b> {hero.publisher} </li>
            <li className="list-group-item"> <b>First appearance:</b> {hero.first_appearance} </li>
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ hero.characters }</p>
        <button className="btn btn-outline-primary" onClick={ onNavigateBack }>
          Regresar
        </button>
      </div>
    </div>
  )
}
