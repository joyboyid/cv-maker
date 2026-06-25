export interface DonationMethod {
  id: "paypal" | "solana" | "bitcoin" | "ethereum";
  name: string;
  symbol: string;
  address: string;
  network: string;
  accent: string;
  accentBg: string;
  href?: string;
}

export const donationMethods: DonationMethod[] = [
  {
    id: "paypal",
    name: "PayPal",
    symbol: "PP",
    address: "paypal.me/mamasgondes",
    network: "PayPal Me",
    href: "https://paypal.me/mamasgondes",
    accent: "text-sky-700",
    accentBg: "bg-sky-100",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    address: "E8vYwYcPS5uGygAc9c6PHrkqSBpfZAqYMRPjpbmscxgX",
    network: "Solana",
    accent: "text-violet-600",
    accentBg: "bg-violet-100",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    address:
      "bc1puszly7nlww3x4d28nwkf8zhh6wnacp6muk0fevf7dh7xtudgy85qmyjag5",
    network: "Bitcoin (Bech32)",
    accent: "text-amber-600",
    accentBg: "bg-amber-100",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    address: "0x4700035EF24eD553BBdF0902297F4334FB0a7a85",
    network: "Ethereum / EVM",
    accent: "text-indigo-600",
    accentBg: "bg-indigo-100",
  },
];