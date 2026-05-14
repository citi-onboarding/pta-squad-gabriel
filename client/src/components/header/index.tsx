"use client";
import Image from "next/image";
import { LogoCITi } from "@/assets";
import { Button } from "@/components/ui/button" // import do botão do shadcn
import { House, BookOpen, Plus } from "lucide-react"; // os imports dos ícones do shadcn
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  return (  
    <nav className="flex items-center justify-between px-20 py-4 border-b border-gray-200"> {/*organização do alinhamento dos botões, da logo e a borda inferior*/}

    {/* logo - canto esquerdo */}
    <div className="flex items-center gap-5">
        <Image src={LogoCITi} alt="Logo citi" width={40} height={40} />
        <span className="font-bold">Biblioteca Escolar</span>
    </div>

    
    {/* lado direito - agrupa tudo junto */}
    <div className="flex items-center gap-4"> 
      <Button className={pathname === "/dashboard" ? "bg-green-100 text-green-600 hover:bg-green-200" : ""} variant="outline">
      <House/>Dashboard</Button>
      <Button className={pathname === "/livros" ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-white"} variant="outline">
      <BookOpen/>Livros</Button>
      <Button className="bg-green-500 text-white hover:bg-green-600"> 
      <Plus/>Novo Livro</Button>
    </div>
    </nav> 
  )
}