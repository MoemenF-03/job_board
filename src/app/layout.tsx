import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import "@radix-ui/themes/styles.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Update the metadata object with your custom title and description
export const metadata: Metadata = {
  title: "Job Board", // Change to your app's name
  description: "Find the latest job listings and start your career today.", // Update this description
  icons: {
    icon: "/favicon.ico", // Reference your favicon file here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <footer className="bg-gray-800 text-white text-center p-4">
          Job Board &copy; {new Date().getFullYear()} - All rights reserved
        </footer>
      </body>
    </html>
  );
}
