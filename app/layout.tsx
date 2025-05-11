import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "電気イスゲーム",
  description: "感電3回で敗北！2人対戦型の心理読み合いゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={`bg-[#1a1a1a] antialiased`}>{children}</body>
    </html>
  );
}
