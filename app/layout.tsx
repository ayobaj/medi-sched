import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontsjark = Plus_Jakarta_Sans({ subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans'});

import {cn} from '@/lib/utils';


export const metadata: Metadata = {
  title: "Medi-Sched",
  description: "Healthcare Management System",
};

type Props = {
  children : React.ReactNode;
}


const Rootlayout = ({children}:Props) => {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontsjark.variable)}>
        {children}
      </body>
    </html>
  )
}

export default Rootlayout


