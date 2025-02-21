import { Dispatch } from 'react';
import type { Guitar } from '../types';
import { CartActions } from '../reducers/cart-reducers';

// Define the GuitarProps type to type-check the Guitar component. 
// The GuitarProps type is a readonly object that contains a guitar object and a function to add the guitar to the cart.
type GuitarProps = Readonly<{
    guitar: Guitar;
    dispatch: Dispatch<CartActions>;
}>;

export default function Guitar({ guitar, dispatch }: GuitarProps) {
    const { name, price, description, image } = guitar;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src={`./public/img/${image}.jpg`}
                    alt="imagen guitarra"
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">
                    {name}
                </h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => dispatch({type: 'add-to-cart', payload: {item: guitar}})}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}
