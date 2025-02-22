import { MenuItem, OrderItem } from '../types';

export type OrderActions =
    | { type: 'add-item'; payload: { item: MenuItem } }
    | { type: 'remove-item'; payload: { id: MenuItem['id'] } }
    | { type: 'place-order' }
    | { type: 'add-tip'; payload: { tip: number } };

export type OrderState = {
    order: OrderItem[];
    tip: number;
};

export const initialState: OrderState = {
    order: [],
    tip: 0,
};

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {
    if (action.type === 'add-item') {
        const existingItem = state.order.find(
            (orderItem) => orderItem.id === action.payload.item.id
        );

        let order: OrderItem[] = [];
        if (existingItem) {
            order = state.order.map((orderItem) => {
                if (orderItem.id === action.payload.item.id) {
                    return { ...orderItem, quantity: orderItem.quantity + 1 };
                } else {
                    return orderItem;
                }
            });
        } else {
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
            order = [...state.order, newItem];
        }
        return {
            ...state,
            order,
        };
    }

    if (action.type === 'remove-item') {
        const order = state.order.filter(
            (item) => item.id !== action.payload.id
        );

        return {
            ...state,
            order,
        };
    }

    if (action.type === 'place-order') {
        return {
            ...state,
			order: [],
			tip: 0
        };
    }

    if (action.type === 'add-tip') {
        return {
            ...state,
			tip: action.payload.tip
        };
    }

    return state;
};
