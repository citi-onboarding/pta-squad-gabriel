import type { Metadata } from "next";
import Header from "@/components/header";
import "styles/globals.css";

export const metadata: Metadata = {
  title: "Biblioteca Escolar",
  description: "Sistema de Gestão de Biblioteca Escolar",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
