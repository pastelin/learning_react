import { useState, ChangeEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../data/categories';
import { Activity } from '../types';
import { useActivity } from '../hooks/useActivity';

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0,
};

export const Form = () => {
    const [activity, setActivity] = useState<Activity>(initialState);
    const {state, dispatch} = useActivity();

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(
                (stateActivity) => stateActivity.id === state.activeId
            )[0];

            setActivity(selectedActivity);
        }
    }, [state.activeId, state.activities]);

    const handleChange = (
        event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        const isNumberField = ['category', 'calories'].includes(
            event.target.id
        );

        setActivity({
            ...activity,
            [event.target.id]: isNumberField
                ? +event.target.value
                : event.target.value,
        });
    };

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch({ type: 'save-activity', payload: { newActivity: activity } });
        setActivity({ ...initialState, id: uuidv4() });
    };

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">
                    Categaría:
                </label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    name="category"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">
                    Actividad:
                </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de naranja, Ensalado, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">
                    Calorías:
                </label>
                <input
                    id="calories"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias. ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={
                    activity.category === 1
                        ? 'Guardar Comida'
                        : 'Guardar Ejercicio'
                }
                disabled={!isValidActivity()}
            />
        </form>
    );
};
