import "./globals.css";
import Navbar from "./components/navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Itim } from "next/font/google";

config.autoAddCss = false;

const itim = Itim({
  subsets: ["thai"],
  weight: "400",
  variable: "--font-thai",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${itim.className}`}>
      <body>
        <Navbar />
        <div className="container mx-auto  pt-26">{children}</div>
      </body>
    </html>
  );
}
