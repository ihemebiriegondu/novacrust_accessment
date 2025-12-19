"use client";

import { useEffect, useState } from "react";
import { RecipientDetails } from "./recipient_details";
import { TransactionConfirmation } from "./transaction_confirmation";
import { ConversionFlow } from "./conversion_flow";

type Screen = "convert" | "recipient" | "send" | "success";

interface CryptoToCashProps {
  onScreenChange?: (screen: Screen) => void;
}

export const CryptoToCash = ({ onScreenChange }: CryptoToCashProps) => {
  const [screen, setScreen] = useState<Screen>("convert");
  const [recipientType] = useState<"bank" | "email">("bank");

  useEffect(() => {
    onScreenChange?.(screen);
  }, [screen, onScreenChange]);

  return (
    <>
      {screen === "convert" && (
        <ConversionFlow onNext={() => setScreen("recipient")} />
      )}

      {screen === "recipient" && (
        <RecipientDetails
          type={recipientType}
          onNext={() => setScreen("send")}
          onBack={() => setScreen("convert")}
        />
      )}

      {screen === "send" && (
        <TransactionConfirmation
          type="send"
          onNext={() => setScreen("success")}
          onBack={() => setScreen("recipient")}
        />
      )}

      {screen === "success" && <TransactionConfirmation type="success" />}
    </>
  );
};
