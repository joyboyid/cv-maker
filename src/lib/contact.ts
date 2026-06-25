export interface ContactChannel {
  id: "telegram";
  name: string;
  label: string;
  handle: string;
  href: string;
  accent: string;
  accentBg: string;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "telegram",
    name: "Telegram",
    label: "Username",
    handle: "@setooo",
    href: "https://t.me/setooo",
    accent: "text-sky-700",
    accentBg: "bg-sky-100",
  },
];