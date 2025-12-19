export function convertCurrency(amount: string, from: string, to: string) {
    const value = Number(amount);
    if (isNaN(value)) return "0.00";

    const baseRates: Record<string, number> = {
        USDT: 1,
        CELO: 1.25,
        TON: 1.33,
        BNB: 2200
    };

    if (!baseRates[from] || !baseRates[to]) return "0.00";

    const converted = (value * baseRates[to]) / baseRates[from];
    return converted < 1
        ? converted.toFixed(6)
        : converted.toFixed(2);

}
