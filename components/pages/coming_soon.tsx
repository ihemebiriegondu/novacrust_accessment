"use client";

import { useState } from "react";
import { Input } from "../reuseable/input";
import { Button } from "../reuseable/button";

interface ComingSoonWidgetProps {
  feature: "cash-to-crypto" | "crypto-to-fiat-loan";
}

export function ComingSoonWidget({ feature }: ComingSoonWidgetProps) {
  const [email, setEmail] = useState("");

  const title =
    feature === "cash-to-crypto" ? "Cash to Crypto" : "Crypto to Fiat Loan";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-6 py-8">
        <h2 className="text-3xl font-semibold text-gray-900">Coming Soon!</h2>

        <div className="flex flex-col gap-2 max-w-md">
          <p className="text-gray-900 font-medium">{title} is almost here.</p>
          <p className="text-gray-600">
            {"Enter your email and we'll let you know the moment it's live."}
          </p>
        </div>

        <div className="w-full max-w-md">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button fullWidth className="max-w-md">
          Update me
        </Button>
      </div>
    </div>
  );
}
