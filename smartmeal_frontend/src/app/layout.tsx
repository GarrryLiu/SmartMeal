import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { UserProvider } from "@/contexts/UserContext";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SmartMeal Planner",
  description: "Your intelligent meal planning companion",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SmartMeal Planner",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SmartMeal Planner",
    title: "SmartMeal Planner",
    description: "Your intelligent meal planning companion",
  },
  twitter: {
    card: "summary",
    title: "SmartMeal Planner",
    description: "Your intelligent meal planning companion",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SmartMeal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
      </head>
      <body className={`${poppins.variable} font-poppins bg-black text-white transition-colors duration-300`}>
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
