import axios from 'axios';
import { SearchType } from '../types';
// import { number, object, parse, string } from 'valibot';
import { z } from 'zod';
import { useMemo, useState } from 'react';

// Type Guards or Assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main === 'object' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number'
//     );
// }

// Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    }),
});

export type Weather = z.infer<typeof Weather>;

// Valibot
// const Weather = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_min: number(),
//         temp_max: number(),
//     }),
// });

// type Weather = typeof Weather.type;

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
    },
};

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search: SearchType) => {
        setLoading(true);
        setWeather(initialState);

        try {
            const appId = import.meta.env.VITE_API_KEY;
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            const { data } = await axios(geoUrl);

            // Comprobar si hay resultados
            if (!data[0]) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            // Castear el Type, no se recomienda porque puede haber errores en tiempo de ejecución.
            // const {data: weatherResult} = await axios<Weather>(weatherUrl);

            // Type Guards
            // const { data: weatherResult } = await axios(weatherUrl);
            // const result = isWeatherResponse(weatherResult);

            // Zod
            const { data: weatherResult } = await axios(weatherUrl);
            const result = Weather.safeParse(weatherResult);
            if (result.success) {
                setWeather(result.data);
            }

            // Valibot
            // const { data: weatherResult } = await axios(weatherUrl);
            // const result = parse(Weather ,weatherResult);
            // console.log(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const hasWeather = useMemo(() => weather.name, [weather]);

    return {
        weather,
        notFound,
        fetchWeather,
        hasWeather,
        loading,
    };
}
