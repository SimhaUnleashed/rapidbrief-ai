import type { Metadata } from "next";
import { Source_Sans_3 as Sans} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const sans = Sans({
  variable: "--fontsans",
  subsets: ["latin"],
  weight:['200','300','400','500','600','700','800','900'],
});


export const metadata: Metadata = {
  title: "RapidBrief -PDF Summarizer Powered by AI",
  description: "Transform lengthy PDFs into clear and concise summaries in seconds using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${sans.variable} font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
        <Header/>
        <main className="flex-1">{children}</main> 
        <Footer/>
        </div>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
