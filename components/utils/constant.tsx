import { FaDollarSign, FaEuroSign, FaPoundSign, FaWallet, FaYenSign } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";
import { SiBinance, SiEthereum } from "react-icons/si";

export const currencies = [
  { code: "USDT", label: "USDT", icon: <SiBinance size={20} /> },
  { code: "CELO", label: "CELO", icon: <SiEthereum size={20} /> },
  { code: "TON", label: "TON", icon: <SiEthereum size={20} /> },
  { code: "BNB", label: "BNB", icon: <SiBinance size={20} /> }
];

export const receiveCurrencies = [
  { code: "USD", label: "US Dollar", icon: <FaDollarSign size={20} /> },
  { code: "EUR", label: "Euro", icon: <FaEuroSign size={20} /> },
  { code: "GBP", label: "British Pound", icon: <FaPoundSign size={20} /> },
  { code: "JPY", label: "Japanese Yen", icon: <FaYenSign size={20} /> },
  { code: "NGN", label: "Naira", icon: <FaNairaSign size={20} /> }
];

export const payFromOptions = [
  { label: "Main balance", icon: <SiBinance /> },
  { label: "Spot wallet", icon: <SiBinance /> },
  { label: "Funding wallet", icon: <SiBinance /> }
];

export const wallets = [
  { label: "Metamask", icon: <FaWallet /> },
  { label: "Rainbow", icon: <FaWallet /> },
  { label: "WalletConnect", icon: <FaWallet /> },
  {
    label: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: <FaWallet />
  }
];
