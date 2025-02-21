// En este archivo se definen los tipos de datos que se van a utilizar en la aplicación más de una vez.

// Definición de type Guitar que contiene los atributos de una guitarra.
export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
};

// Definición de type CartItem que extiende de Guitar y agrega la propiedad quantity.
export type CartItem = Guitar & {
    quantity: number;
};
