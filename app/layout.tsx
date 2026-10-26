import type { Metadata } from "next";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/nanum-pen-script/400.css";
import "@fontsource/gamja-flower/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "숏킷 · SNS 영상 만들기",
  description: "사진과 영상으로 릴스·쇼츠·틱톡 영상과 게시글 캡션을 만드는 숏킷",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
