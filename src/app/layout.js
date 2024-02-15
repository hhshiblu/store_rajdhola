import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/sessionProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rajdhola.com",
  description: "rajdhola is a big company as a e-commerce",
  keywords: ["Rajdhola", "rajdhola", "rajdhala"],
  metadataBase: new URL("http://localhost:3000"),

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    images: "/rajdhola_title_logo.svg",
  },
  icons: {
    icon: ["/favicon_crome.png"],
    apple: ["/apple_favicon.png"],
    shortcut: ["/apple_favicon.png"],
  },
};
export const dynamic = "force-dynamic";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
