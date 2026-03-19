import "./globals.css";

export const metadata = {
  title: "বিকাশ — EKRAM",
  description: "Eid Salami Service",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  themeColor: "#E2136E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
