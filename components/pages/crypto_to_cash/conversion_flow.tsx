"use client";

import { useState } from "react";
import { DropdownMenu } from "../../reuseable/dropdown_menu";
import { Button } from "../../reuseable/button";
import { validateCryptoToCash } from "@/components/utils/validation";
import { convertCurrency } from "@/components/utils/conversion.helper";
import {
  currencies,
  payFromOptions,
  wallets
} from "@/components/utils/constant";
import { FiChevronDown } from "react-icons/fi";
import { useCryptoToCashStore } from "@/components/store/crypto_to_cash.store";

export const ConversionFlow = ({ onNext }: { onNext: () => void }) => {
  const {
    payAmount,
    payCurrencyCode,
    receiveCurrencyCode,
    payFrom,
    payTo,
    setPayAmount,
    setPayCurrencyCode,
    setReceiveCurrencyCode,
    setPayFrom,
    setPayTo
  } = useCryptoToCashStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const payCurrency =
    currencies.find((c) => c.code === payCurrencyCode) ?? currencies[0];

  const receiveCurrency =
    currencies.find((c) => c.code === receiveCurrencyCode) ?? currencies[1];

  const receiveAmount = convertCurrency(
    payAmount,
    payCurrency.code,
    receiveCurrency.code
  );

  const handleConvert = () => {
    const result = validateCryptoToCash({
      payAmount,
      receiveAmount,
      payCurrency: payCurrency.code,
      receiveCurrency: receiveCurrency.code,
      wallet: payTo,
      payFrom
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    onNext();
  };

  const clearError = (key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 p-6 border border-border rounded-4xl">
        <label className="text-base font-medium text-gray-500">You pay</label>
        <div className="flex items-center gap-5 md:gap-10 w-full justify-between">
          <input
            type="tel"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            className="text-2xl! font-semibold outline-none border-none text-foreground! w-7/10"
          />

          <DropdownMenu
            items={currencies.map((c) => ({
              label: c.label,
              icon: c.icon,
              onClick: () => setPayCurrencyCode(c.code)
            }))}
            buttonClass="px-3 py-2 gap-1 w-full! flex justify-between items-center rounded-full bg-card-bg hover:bg-gray-100"
            dropdownClass="min-w-7/10"
            searchable
          >
            {payCurrency.icon}
            <span className="font-medium text-sm text-primary">
              {payCurrency.label}
            </span>
          </DropdownMenu>
        </div>
        {errors.payAmount && (
          <p className="text-sm text-red-500">{errors.payAmount}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 p-6 border border-border rounded-4xl">
        <label className="text-base font-medium text-gray-500">
          You receive
        </label>
        <div className="flex items-center gap-5 md:gap-10 w-full justify-between">
          <input
            type="text"
            value={receiveAmount}
            disabled
            className="flex-1 text-2xl! font-semibold outline-none border-none text-foreground! bg-transparent cursor-not-allowed w-7/10"
          />

          <DropdownMenu
            items={currencies.map((c) => ({
              label: c.label,
              icon: c.icon,
              onClick: () => setReceiveCurrencyCode(c.code)
            }))}
            dropdownClass="min-w-7/10"
            buttonClass="px-3 py-2 gap-1 w-full! flex justify-between items-center rounded-full bg-card-bg hover:bg-gray-100"
            searchable
          >
            {receiveCurrency.icon}
            <span className="font-medium text-sm text-primary">
              {receiveCurrency.label}
            </span>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-base font-medium text-primary">Pay from</label>
        <DropdownMenu
          items={payFromOptions.map((p) => ({
            label: p.label,
            icon: p.icon,
            onClick: () => {
              setPayFrom(p.label);
              clearError("payFrom");
            }
          }))}
          buttonClass="p-4 md:p-6 w-full! flex justify-between items-center"
          dropdownClass="min-w-11/12"
        >
          <span
            className={`${
              payFrom ? "text-primary" : "text-gray-500"
            } text-base`}
          >
            {payFrom ?? "Select an option"}
          </span>
        </DropdownMenu>
        {errors.payFrom && (
          <p className="text-sm text-red-500">{errors.payFrom}</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-base font-medium text-primary">Pay to</label>
        <DropdownMenu
          items={wallets.map((w) => ({
            label: w.label,
            icon: w.icon,
            onClick: () => {
              setPayTo(w.label);
              clearError("wallet");
            }
          }))}
          buttonClass="p-4 md:p-6 w-full! flex justify-between items-center"
          dropdownClass="min-w-11/12"
        >
          <span
            className={`${payTo ? "text-primary" : "text-gray-500"} text-base`}
          >
            {payTo ?? "Select an option"}
          </span>
        </DropdownMenu>
        {errors.wallet && (
          <p className="text-sm text-red-500">{errors.wallet}</p>
        )}
      </div>

      <Button fullWidth className="mt-4" onClick={handleConvert}>
        Convert now
      </Button>
    </div>
  );
};
