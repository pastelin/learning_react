import { create } from 'zustand';
import { Cryptocurrency, CryptoPrice, Pair } from './types';
import { devtools } from 'zustand/middleware';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService';

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[];
    result: CryptoPrice;
    loading: boolean;
    fetchCryptos: () => Promise<void>;
    fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
    devtools((set) => ({
        cryptocurrencies: [],
        result: {} as CryptoPrice,
        loading: false,
        fetchCryptos: async () => {
            const cryptocurrencies = await getCryptos();
            set(() => ({
                cryptocurrencies,
            }));
        },
        fetchData: async (pair) => {
            set(() => ({
                loading: true,
            }));
            const result = await fetchCurrentCryptoPrice(pair);
            set(() => ({
                result,
                loading: false,
            }));
        },
    }))
);
