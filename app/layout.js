import "./globals.css";

export const metadata = {
  title: "বিকাশ — EKRAM",
  description: "Eid Salami Service",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#E2136E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
