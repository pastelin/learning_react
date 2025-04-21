import { z } from 'zod';

export const CurrencySchema = z.object({
    code: z.string().min(3).max(3),
    name: z.string().min(1),
});

export const CryptoCurrencyResponseSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string().min(1),
        Name: z.string().min(1),
    }),
});

export const CryptoCurrenciesResponseSchema = z.array(
    CryptoCurrencyResponseSchema
);

export const PairSchema = z.object({
    currency: z.string().min(3).max(3),
    criptocurrency: z.string().min(1),
});

export const CryptoPriceSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string(),
});
