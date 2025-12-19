"use client";

import { ComingSoonWidget } from "@/components/pages/coming_soon";
import { CryptoToCash } from "@/components/pages/crypto_to_cash/crypto_to_cash";
import { TabGroup } from "@/components/reuseable/tab_group";
import { useState } from "react";

type TabId = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-fiat-loan";

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("crypto-to-cash");
  const [cryptoScreen, setCryptoScreen] = useState<
    "convert" | "recipient" | "send" | "success"
  >("convert");

  const tabs = [
    { id: "crypto-to-cash", label: "Crypto to cash" },
    { id: "cash-to-crypto", label: "Cash to crypto" },
    { id: "crypto-to-fiat-loan", label: "Crypto to fiat loan" }
  ];

  function renderActiveView() {
    switch (activeTab) {
      case "crypto-to-cash":
        return <CryptoToCash onScreenChange={setCryptoScreen} />;

      case "cash-to-crypto":
      case "crypto-to-fiat-loan":
        return <ComingSoonWidget feature={activeTab} />;
    }
  }

  const showTabs = activeTab !== "crypto-to-cash" || cryptoScreen === "convert";

  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-10">
      {showTabs && (
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as TabId)}
        />
      )}

      <div className="flex flex-col gap-4 md:gap-6">{renderActiveView()}</div>
    </div>
  );
}
