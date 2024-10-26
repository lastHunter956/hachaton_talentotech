import "./globals.css";
import Providers from "./Providers.jsx";
import { NextUIProvider } from "@nextui-org/system";
import { Inter } from "next/font/google";
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To Do List by Lucas Cabral",
  description: "Developed and designed by Lucas Cabral",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Providers>
            <div className="cont">

              {children}

            </div>
          </Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
