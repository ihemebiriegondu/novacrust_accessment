"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { currencies } from "@/components/utils/constant";

type RecipientDetailsState = {
    bank: string;
    accountNumber: string;
    accountName: string;
    email: string;
    phoneCountry: string;
    phoneNumber: string;
};

type CryptoToCashState = {
    payAmount: string;
    payCurrencyCode: string;
    receiveCurrencyCode: string;
    payFrom: string | null;
    payTo: string | null;

    setPayAmount: (v: string) => void;
    setPayCurrencyCode: (v: string) => void;
    setReceiveCurrencyCode: (v: string) => void;
    setPayFrom: (v: string | null) => void;
    setPayTo: (v: string | null) => void;

    recipient: RecipientDetailsState;
    setRecipientDetails: (data: Partial<RecipientDetailsState>) => void;
    resetRecipientDetails: () => void;

    reset: () => void;
};

export const useCryptoToCashStore = create<CryptoToCashState>()(
    persist(
        (set) => ({
            payAmount: "1.00",
            payCurrencyCode: currencies[0].code,
            receiveCurrencyCode: currencies[1].code,
            payFrom: null,
            payTo: null,

            setPayAmount: (v) => set({ payAmount: v }),
            setPayCurrencyCode: (v) => set({ payCurrencyCode: v }),
            setReceiveCurrencyCode: (v) => set({ receiveCurrencyCode: v }),
            setPayFrom: (v) => set({ payFrom: v }),
            setPayTo: (v) => set({ payTo: v }),

            recipient: {
                bank: "",
                accountNumber: "",
                accountName: "ODUTUGA GBEKE",
                email: "",
                phoneCountry: "+234",
                phoneNumber: ""
            },

            setRecipientDetails: (data) =>
                set((state) => ({
                    recipient: { ...state.recipient, ...data }
                })),

            resetRecipientDetails: () =>
                set({
                    recipient: {
                        bank: "",
                        accountNumber: "",
                        accountName: "ODUTUGA GBEKE",
                        email: "",
                        phoneCountry: "+234",
                        phoneNumber: ""
                    }
                }),

            reset: () =>
                set({
                    payAmount: "1.00",
                    payCurrencyCode: currencies[0].code,
                    receiveCurrencyCode: currencies[1].code,
                    payFrom: null,
                    payTo: null,
                    recipient: {
                        bank: "",
                        accountNumber: "",
                        accountName: "ODUTUGA GBEKE",
                        email: "",
                        phoneCountry: "+234",
                        phoneNumber: ""
                    }
                })
        }),
        {
            name: "crypto-to-cash",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
