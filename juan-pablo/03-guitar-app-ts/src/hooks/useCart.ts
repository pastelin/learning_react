import { useEffect, useMemo, useState } from 'react';
import { db } from '../data/db';
import type { Guitar, CartItem } from '../types';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    };

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(item: Guitar) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

        if (itemExist >= 0) {
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++;
            setCart(updatedCart);
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }

    // Param id is the id of the guitar to remove from the cart.
    function removeFromCart(id: Guitar['id']) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                item.quantity++;
            }
            return item;
        });
        setCart(updatedCart);
    }

    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                item.quantity--;
            }

            return item;
        });

        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () =>
            cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    };
};
