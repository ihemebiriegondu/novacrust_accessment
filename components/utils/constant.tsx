import { FaWallet } from "react-icons/fa";
import { SiBinance, SiEthereum } from "react-icons/si";

export const currencies = [
  { code: "USDT", label: "USDT", icon: <SiBinance size={20} /> },
  { code: "CELO", label: "CELO", icon: <SiEthereum size={20} /> },
  { code: "TON", label: "TON", icon: <SiEthereum size={20} /> },
  { code: "BNB", label: "BNB", icon: <SiBinance size={20} /> }
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
