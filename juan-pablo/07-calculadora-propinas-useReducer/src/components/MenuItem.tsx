import { Dispatch } from 'react';
import type { MenuItem } from '../types';
import { OrderActions } from '../reducer/order-reducer';

type MenuItemProps = {
    readonly item: MenuItem;
    readonly dispath: Dispatch<OrderActions>;
};

export default function MenuItem({ item, dispath }: MenuItemProps) {
    return (
        <button
            className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
            onClick={() => dispath({ type: 'add-item', payload: { item } })}
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    );
}
