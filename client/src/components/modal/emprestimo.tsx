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

export type EmprestDataProps = {
  livroId: string;
  nome: string;
  email: string;
  dataLoc: Date;
  dataDevol: Date;
};

type LivroMock = {
  id: number;
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
      newErrors.dataDevol = "Deve ser depois da locação";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onConfirm({
      livroId: livro.id.toString(),
      nome: formData.nome,
      email: formData.email,
      dataLoc: new Date(formData.dataLoc),
      dataDevol: new Date(formData.dataDevol),
    });
    setOpen(false);
    setFormData({
      nome: "",
      email: "",
      dataLoc: new Date().toISOString().split("T")[0],
      dataDevol: "",
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setErrors({ nome: "", email: "", dataLoc: "", dataDevol: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default">Realizar Empréstimo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Realizar Empréstimo</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-1">
                <Label htmlFor="livro">Livro selecionado</Label>
                    <div className="rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm">
                        {livro.titulo}
                    </div>
            </div>

          {/* Nome do Cliente */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="nome">Nome do Cliente</Label>
                <Input
                    id="nome"
                    type="nome"
                    placeholder="Digite o nome do cliente"
                    value={formData.nome}
                    onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                    }
                />
                {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome}</p>
                )}
            </div>

          {/* Email do Cliente */}
            <div className="flex flex-col gap-1">
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
                {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            {/* Datas lado a lado */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                <Label htmlFor="dataLoc">Data da Locação</Label>
                <Input
                    id="dataLoc"
                    type="date"
                    value={formData.dataLoc}
                    onChange={(e) =>
                    setFormData({ ...formData, dataLoc: e.target.value })
                    }
                />
                {errors.dataLoc && (
                    <p className="text-red-500 text-sm">{errors.dataLoc}</p>
                )}
                </div>
                <div className="flex flex-col gap-1">
                <Label htmlFor="dataDevol">Data Previsão de Devolução</Label>
                <Input
                    id="dataDevol"
                    type="date"
                    value={formData.dataDevol}
                    onChange={(e) =>
                    setFormData({ ...formData, dataDevol: e.target.value })
                    }
                />
                {errors.dataDevol && (
                    <p className="text-red-500 text-sm">{errors.dataDevol}</p>
                )}
                </div>
            </div>
            </div>

            <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
                Cancelar
            </Button>
            <Button onClick={handleSubmit}>Confirmar Empréstimo</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
