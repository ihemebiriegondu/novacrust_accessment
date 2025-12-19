export const isPositiveNumber = (value: string) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
};

export const validateCryptoToCash = (data: {
    payAmount: string;
    receiveAmount: string;
    payCurrency: string;
    receiveCurrency: string;
    wallet: string | null;
    payFrom: string | null;
}) => {
    const errors: Record<string, string> = {};

    if (!isPositiveNumber(data.payAmount)) {
        errors.payAmount = "Enter a valid amount";
    }

    if (!isPositiveNumber(data.receiveAmount)) {
        errors.receiveAmount = "Enter a valid amount";
    }

    if (!data.payCurrency) {
        errors.payCurrency = "Select a currency";
    }

    if (!data.receiveCurrency) {
        errors.receiveCurrency = "Select a currency";
    }

    if (!data.payFrom) {
        errors.payFrom = "Select where you are paying from";
    }

    if (!data.wallet) {
        errors.wallet = "Select a wallet";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateRecipientBank = (data: {
    bank: string;
    accountNumber: string;
}) => {
    const errors: Record<string, string> = {};

    if (!data.bank) {
        errors.bank = "Select a bank";
    }

    if (!/^\d{10}$/.test(data.accountNumber)) {
        errors.accountNumber = "Account number must be 10 digits";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateRecipientEmail = (data: {
    email: string;
    phoneNumber: string;
}) => {
    const errors: Record<string, string> = {};

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email";
    }

    if (!/^\d{7,15}$/.test(data.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
