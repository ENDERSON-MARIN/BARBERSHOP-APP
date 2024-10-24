import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbershop App",
  description: "Ing Enderson Marín",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
            <Toaster />
            <Footer  />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

