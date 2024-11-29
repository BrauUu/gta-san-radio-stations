import localFont from "next/font/local";
import "./globals.css";

const defaultFont = localFont({
  src: "./fonts/BankGothicRegular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
});

export const metadata = {
  title: "GTA SAN: Radios",
  description: "Here you can listen to your favorite GTA SAN radios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${defaultFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
