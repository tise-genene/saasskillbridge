import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillBridge - The Skills-to-Income Platform for Emerging Markets",
  description: "Connect learners with expert instructors across Africa. From academic tutoring to professional skills, we're building the future of skills exchange.",
  keywords: "tutoring, skills, education, Africa, Ethiopia, online learning, marketplace",
  authors: [{ name: "SkillBridge Team" }],
  creator: "SkillBridge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
