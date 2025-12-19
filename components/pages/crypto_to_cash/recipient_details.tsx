"use client";

import { useState, useEffect } from "react";
import { Select } from "../../reuseable/select";
import { Input } from "../../reuseable/input";
import { Button } from "../../reuseable/button";
import {
  validateRecipientBank,
  validateRecipientEmail
} from "@/components/utils/validation";
import { FiChevronDown } from "react-icons/fi";
import { FaFlag } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { useCryptoToCashStore } from "@/components/store/crypto_to_cash.store";

export const RecipientDetails = ({
  type,
  onNext,
  onBack
}: {
  type: "bank" | "email";
  onNext: () => void;
  onBack: () => void;
}) => {
  const recipient = useCryptoToCashStore((s) => s.recipient);
  const setRecipientDetails = useCryptoToCashStore(
    (s) => s.setRecipientDetails
  );

  const [formData, setFormData] = useState(recipient);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(recipient);
  }, [recipient]);

  const clearError = (key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const bankOptions = [
    { value: "", label: "Select an option" },
    { value: "access", label: "Access Bank" },
    { value: "gtb", label: "GTBank" },
    { value: "uba", label: "UBA" }
  ];

  const handleNext = () => {
    const result =
      type === "bank"
        ? validateRecipientBank(formData)
        : validateRecipientEmail(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setRecipientDetails(formData);
    onNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between md:mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={onBack}>
          <GoArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold text-primary">
          Recipient details
        </h2>
        <span />
      </div>

      {type === "bank" ? (
        <>
          <Select
            label="Bank"
            options={bankOptions}
            value={formData.bank}
            onChange={(value) => {
              setFormData({ ...formData, bank: value });
              clearError("bank");
            }}
          />
          {errors.bank && <p className="text-sm text-red-500">{errors.bank}</p>}

          <Input
            label="Account number"
            placeholder="Enter your account number"
            maxLength={10}
            value={formData.accountNumber}
            onChange={(e) => {
              setFormData({
                ...formData,
                accountNumber: e.target.value
              });
              clearError("accountNumber");
            }}
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-500">{errors.accountNumber}</p>
          )}

          <div className="flex flex-col gap-4">
            <label className="text-base font-medium text-primary">
              Account name
            </label>
            <div className="px-6 py-4 rounded-full bg-card-bg text-primary font-medium">
              {formData.accountName}
            </div>
          </div>
        </>
      ) : (
        <>
          <Input
            label="Recipient email"
            type="email"
            placeholder="Enter recipient email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              clearError("email");
            }}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <div className="flex flex-col gap-4">
            <label className="text-base font-medium text-primary">
              Recipient phone number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-6 py-4 rounded-xl border border-border">
                <span>{formData.phoneCountry}</span>
                <FaFlag className="text-green-600" />
                <FiChevronDown className="text-gray-400" />
              </div>

              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value
                  });
                  clearError("phoneNumber");
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-border focus:border-primary outline-none"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
        </>
      )}

      <Button fullWidth className="mt-4" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};
