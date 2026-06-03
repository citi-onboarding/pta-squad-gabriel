"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // import do botão do shadcn
import { House, BookOpen, Plus } from "lucide-react"; // os imports dos ícones do shadcn
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoCITi } from "@/assets";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        {" "}
        {/*organização do alinhamento com a barra de buscas*/}
        <div className="flex items-center gap-3">
          <Image src={LogoCITi} alt="Logo citi" width={40} height={40} />
          <span className="max-w-[60%] font-bold text-gray-800 whitespace-normal break-words leading-tight sm:whitespace-nowrap sm:break-normal">
            Biblioteca Escolar
          </span>
        </div>
        {/* lado direito - agrupa tudo junto */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              aria-label="Dashboard"
              className={
                pathname === "/dashboard"
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-white/60"
              }
              variant="outline"
            >
              <House />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          <Link href="/livros">
            <Button
              aria-label="Livros"
              className={
                pathname === "/livros"
                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                  : "bg-white/60"
              }
              variant="outline"
            >
              <BookOpen />
              <span className="hidden sm:inline">Livros</span>
            </Button>
          </Link>
          <Link href="/livros/novo">
            <Button
              aria-label="Novo Livro"
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Plus />
              <span className="hidden sm:inline">Novo Livro</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
