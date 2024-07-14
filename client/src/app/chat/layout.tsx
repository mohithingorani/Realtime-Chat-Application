import { Poppins } from "next/font/google";

const poppins_init = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '700'],
  variable: '--font-poppins'
});


export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins_init.className} `}>
        {children}
      </body>
    </html>
  );
}
