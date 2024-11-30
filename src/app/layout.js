
import localFont from "next/font/local";
import "./globals.css";

const defaultFont = localFont({
  src: "../../public/fonts/BankGothicRegular.ttf",
  variable: "--font-geist-mono",
  weight: "400",
});

export const metadata = {
  title: "GTA SAN: Radios Stations",
  description: "Here you can listen to your favorite Grand Theft Auto: San Andreas radio stations!",
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
