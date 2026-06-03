import type { Metadata } from "next";
import Header from "@/components/Header";
import "styles/globals.css";
import { Toaster } from "sonner";

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
        <Toaster></Toaster>
      </body>
    </html>
  );
}
