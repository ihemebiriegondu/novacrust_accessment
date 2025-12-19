export function convertCurrency(amount: string, from: string, to: string) {
    const value = Number(amount);
    if (isNaN(value)) return "0.00";

    const cryptoRatesUSD: Record<string, number> = {
        USDT: 1,     
        CELO: 1.25, 
        TON: 1.33,   
        BNB: 220     
    };

    const fiatRatesUSD: Record<string, number> = {
        USD: 1,
        EUR: 1.1,   
        GBP: 0.9,   
        JPY: 150,   
        NGN: 1000   
    };

    const fromRate = cryptoRatesUSD[from];
    const toRate = fiatRatesUSD[to];

    if (fromRate === undefined || toRate === undefined) return "0.00";

    const converted = (value * fromRate * toRate) / 1;

    return converted < 1 ? converted.toFixed(6) : converted.toFixed(2);
}
