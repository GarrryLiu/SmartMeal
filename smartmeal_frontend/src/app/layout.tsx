import type { Metadata, Viewport } from "next";
import { Cormorant_Infant, Work_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { UserProvider } from "@/contexts/UserContext";

const cormorantInfant = Cormorant_Infant({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "SnapCook Planner",
  description: "Your intelligent meal planning companion",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SnapCook Planner",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SnapCook Planner",
    title: "SnapCook Planner",
    description: "Your intelligent meal planning companion",
  },
  twitter: {
    card: "summary",
    title: "SnapCook Planner",
    description: "Your intelligent meal planning companion",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SnapCook" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#10b981" />
      </head>
      <body className={`${cormorantInfant.variable} ${workSans.variable} font-work-sans bg-gray-50 text-gray-900 transition-colors duration-300`}>
        <UserProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 lg:ml-20 pb-20 lg:pb-0">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
