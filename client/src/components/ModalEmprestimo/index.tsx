"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bookmark } from "lucide-react";

export type EmprestDataProps = {
  livroId: string;
  nome: string;
  email: string;
  dataLoc: Date;
  dataDevol: Date;
};

type LivroMock = {
  id: string;
  titulo: string;
};

type EmprestProps = {
  livro: LivroMock;
  onConfirm: (dados: EmprestDataProps) => void;
};

export function Emprestimo({ livro, onConfirm }: EmprestProps) {
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataLoc: new Date().toISOString().split("T")[0], //Data de hoje("2026-05-18T14:30:00.000Z") --> ["2026-05-18", "14:30:00.000Z"] --> "2026-05-18"
    dataDevol: "",
  });
  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    dataLoc: "",
    dataDevol: "",
  });

  const validateForm = () => {
    const newErrors = { nome: "", email: "", dataLoc: "", dataDevol: "" };
    let isValid = true;

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.dataLoc) {
      newErrors.dataLoc = "Obrigatório";
      isValid = false;
    }

    if (!formData.dataDevol) {
      newErrors.dataDevol = "Obrigatório";
      isValid = false;
    } else if (new Date(formData.dataDevol) < new Date(formData.dataLoc)) {
      newErrors.dataDevol = "Data deve ser após a data de locação";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onConfirm({
      livroId: livro.id,
      nome: formData.nome,
      email: formData.email,
      dataLoc: new Date(formData.dataLoc),
      dataDevol: new Date(formData.dataDevol),
    });
    setOpen(false);
    resetForms();
  };

  const handleCancel = () => {
    setOpen(false);
    resetForms();
  };

  const resetForms = () => {
    setErrors({ nome: "", email: "", dataLoc: "", dataDevol: "" });
    setFormData({
      nome: "",
      email: "",
      dataLoc: new Date().toISOString().split("T")[0],
      dataDevol: "",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(novaSituacao) => {
        if (!novaSituacao) {
          resetForms();
        }
        setOpen(novaSituacao);
      }}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-emerald-500 text-white h-12 w-36 rounded-lg flex items-center justify-center"
        >
          <Bookmark />
          <span>Emprestar </span>
        </Button>
      </DialogTrigger>

      { /* Responsividade em width*/ }
      <DialogContent 
        className="
        w-[95%]           
        sm:w-[300px]      
        md:w-[350px]      
        max-w-[calc(100vw-2rem)]
        max-h-[90vh]      
        overflow-y-auto
        overflow-x-hidden
        p-0
        rounded-lg       
        bg-white         
        shadow-xl
      "
      >
        <DialogHeader className="border-0 p-0 m-0">
          <div className="px-5 pt-5 pb-3">
            <DialogTitle className="text-left p-0 m-0 font-medium">
              Realizar Empréstimo
            </DialogTitle>
          </div>
          <div className="border-b border-gray-200 w-full"></div>
        </DialogHeader>

        <div className="px-5 py-4 space-y-4">
          {/* Livro selecionado */}
          <div className="rounded-lg border-gray-300 bg-gray-100 px-3 py-3">
            <Label className="text-gray-500 font-normal">
              Livro selecionado
            </Label>
            <div className="text-sm font-normal">{livro.titulo}</div>
          </div>

          {/* Nome */}
          <div className="space-y-1">
            <Label htmlFor="nome">Nome do Cliente</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite o nome do cliente"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
              <div className="h-1 text-sm text-red-500">
                {errors.nome && <span>{errors.nome}</span>}
              </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email do Cliente</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite o email do cliente"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <div className="h-1 text-sm text-red-500">
                {errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Data locação */}
            <div className="space-y-1">
              <Label htmlFor="dataLoc">Data da Locação</Label>
              <Input 
              id="dataLoc"
              type="date" 
              value={formData.dataLoc}
              onChange={(e) =>
                setFormData({ ...formData, dataLoc: e.target.value })
                }
              />
              <div className="h-1 text-sm text-red-500">
                {errors.dataLoc && <span>{errors.dataLoc}</span>}
              </div>
          </div>

            {/* Data devolução */}
            <div className="space-y-1">
              <Label htmlFor="dataDevol">Data Prevista de Devolução</Label>
              <Input 
              id="dataDevol"
              type="date" 
              value={formData.dataDevol}
              onChange={(e) =>
                setFormData({ ...formData, dataDevol: e.target.value })
                }
              />
              <div className="h-1 text-sm text-red-500">
                {errors.dataDevol && <span>{errors.dataDevol}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer com linha e botões */}
        <div>
          <div className="border-t border-gray-200 w-full"></div>
          <div className="px-5 py-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-2 border-emerald-500 text-emerald-500 w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-emerald-500 w-full sm:w-auto"
              >
                Confirmar Empréstimo
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
