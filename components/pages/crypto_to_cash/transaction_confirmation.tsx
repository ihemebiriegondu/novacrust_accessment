"use client";

import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { FiCopy, FiInfo } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import { Button } from "../../reuseable/button";
import { useCryptoToCashStore } from "@/components/store/crypto_to_cash.store";

interface TransactionConfirmationProps {
  type: "send" | "success";
  onNext?: () => void;
  onBack?: () => void;
}

export function TransactionConfirmation({
  type,
  onNext,
  onBack
}: TransactionConfirmationProps) {
  const resetAll = useCryptoToCashStore((s) => s.reset);

  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (type === "send") {
    const transactionAddress = "4LiV4YjbxsL6739MKghUd";
    const transactionAmount = "100 ETH";
    const transactionNetwork = "ETH";
    const transactionWallet = "Other";

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between md:mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={onBack}>
            <GoArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-primary">
            Send ETH to the address below
          </h2>
          <span />
        </div>

        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-full mx-auto bg-primary-light w-fit">
          <span className="text-base font-medium text-primary">
            {transactionAddress}
          </span>
          <button
            className="p-1 hover:bg-primary/20 rounded transition-colors"
            onClick={() => copyToClipboard(transactionAddress, "address")}
          >
            <FiCopy className="w-4 h-4 text-primary" />
          </button>
          {copied["address"] && (
            <span className="text-sm text-green-600 ml-2">Copied!</span>
          )}
        </div>

        <div className="flex flex-col gap-4 md:gap-6 py-3 md:py-4 px-4 md:px-6 bg-card-bg rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount to send</span>
            <div className="flex items-center gap-2">
              <span className="text-base text-primary">
                {transactionAmount}
              </span>
              <button
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                onClick={() => copyToClipboard(transactionAmount, "amount")}
              >
                <FiCopy className="w-4 h-4 text-primary" />
              </button>
              {copied["amount"] && (
                <span className="text-sm text-green-600 ml-2">Copied!</span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Network</span>
            <span className="text-base text-primary">{transactionNetwork}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Wallet</span>
            <span className="text-base text-primary">{transactionWallet}</span>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <FiInfo className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700">
            Only send (USDT) to this address. Ensure the sender is on the (CELO)
            network otherwise you might lose your deposit.
          </p>
        </div>

        <Button
          fullWidth
          className="mt-2"
          onClick={() => {
            resetAll();
            onNext?.();
          }}
        >
          I have sent it
        </Button>
      </div>
    );
  }

  // success screen
  return (
    <div className="flex flex-col items-center text-center gap-8 py-8">
      <div className="w-16.5 h-16.5 bg-[#219653] rounded-full flex items-center justify-center">
        <BsCheckLg className="w-9 h-9 text-white" />
      </div>

      <p>yayyyy</p>

      <button
        className="text-primary font-bold hover:underline"
        onClick={() => window.location.reload()}
      >
        Go back to home
      </button>
    </div>
  );
}
