import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const poppins_init = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '700'],
  variable: '--font-poppins'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className} ${poppins_init.className} `}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
