import localFont from "next/font/local";
import "./globals.css";

const defaultFont = localFont({
  src: "../../public/fonts/BankGothicMedium.ttf",
  variable: "--font-default",
  weight: "400",
});

const secondaryFont = localFont({
  src: "../../public/fonts/beckett.ttf",
  variable: "--font-secondary",
  weight: "400",
});

export const metadata = {
  title: "Grand Theft Auto - San Andreas: Radio Stations",
  description: "Here you can listen to your favorite Grand Theft Auto: San Andreas radio stations!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${defaultFont.variable} ${secondaryFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
