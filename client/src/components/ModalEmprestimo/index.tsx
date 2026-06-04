"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmprestimoProps, LivroResumido } from "@/types";

type ModalEmprestProps = {
  livro: LivroResumido;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmEmprestar: (emprestimo: EmprestimoProps) => Promise<void>;
};

export function ModalEmprestimo({
  livro,
  open,
  onOpenChange,
  onConfirmEmprestar,
}: ModalEmprestProps) {
  const [formData, setFormData] = useState({
    nome_cliente: "",
    email_cliente: "",
    data_locacao: new Date().toISOString().split("T")[0],
    data_prevista_devolucao: "",
  });
  const [errors, setErrors] = useState({
    nome_cliente: "",
    email_cliente: "",
    data_locacao: "",
    data_prevista_devolucao: "",
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      nome_cliente: "",
      email_cliente: "",
      data_locacao: "",
      data_prevista_devolucao: "",
    };
    let isValid = true;

    // validar o nome — obrigatório, mínimo de 3 caracteres, só letras e espaços
    if (!formData.nome_cliente.trim()) {
      newErrors.nome_cliente = "Nome é obrigatório";
      isValid = false;
    } else if (formData.nome_cliente.trim().length < 3) {
      newErrors.nome_cliente = "Nome deve ter pelo menos 3 caracteres";
      isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.nome_cliente.trim())) {
      newErrors.nome_cliente = "Nome deve conter apenas letras";
      isValid = false;
    }

    // validar o email — obrigatório e formato válido 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email_cliente.trim()) {
      newErrors.email_cliente = "Email é obrigatório";
      isValid = false;
    } else if (!emailRegex.test(formData.email_cliente)) {
      newErrors.email_cliente = "Email inválido";
      isValid = false;
    }

    // validar se a data de locação existe e não é no passado, e se a data de devolução existe e é após a data de locação
    const hoje = new Date().toISOString().split("T")[0];
    if (!formData.data_locacao) {
      newErrors.data_locacao = "Obrigatório";
      isValid = false;
    } else if (formData.data_locacao < hoje) {
      newErrors.data_locacao = "Data de locação não pode ser no passado";
      isValid = false;
    }

    if (!formData.data_prevista_devolucao) {
      newErrors.data_prevista_devolucao = "Obrigatório";
      isValid = false;
    } else if (formData.data_prevista_devolucao < formData.data_locacao) {
      newErrors.data_prevista_devolucao = "Data deve ser após a data de locação";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setConfirmDialogOpen(true);
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
    onOpenChange(false);
    resetForms();
  };

  const handleConfirm = async () => {
    const emprestimoData: EmprestimoProps = {
      livroId: livro.id,
      ...formData,
    };

    setLoading(true);

    try {
      await onConfirmEmprestar(emprestimoData);
      resetForms();
      setConfirmDialogOpen(false);
      onOpenChange(false);
    } catch (error) {
      console.error(error || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmDialog = (nextOpen: boolean) => {
    if (!nextOpen && loading) return;
    setConfirmDialogOpen(nextOpen);
  };

  const resetForms = () => {
    setErrors({
      nome_cliente: "",
      email_cliente: "",
      data_locacao: "",
      data_prevista_devolucao: "",
    });
    setFormData({
      nome_cliente: "",
      email_cliente: "",
      data_locacao: new Date().toISOString().split("T")[0],
      data_prevista_devolucao: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Label htmlFor="nome_cliente">Nome do Cliente</Label>
            <Input
              id="nome_cliente"
              type="text"
              placeholder="Digite o nome do cliente"
              value={formData.nome_cliente}
              onChange={(e) =>
                setFormData({ ...formData, nome_cliente: e.target.value })
              }
            />
            <div className="h-1 text-sm text-red-500">
              {errors.nome_cliente && <span>{errors.nome_cliente}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email_cliente">Email do Cliente</Label>
            <Input
              id="email_cliente"
              type="email"
              placeholder="Digite o email do cliente"
              value={formData.email_cliente}
              onChange={(e) =>
                setFormData({ ...formData, email_cliente: e.target.value })
              }
            />
            <div className="h-1 text-sm text-red-500">
              {errors.email_cliente && <span>{errors.email_cliente}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Data locação */}
            <div className="space-y-1">
              <Label htmlFor="data_locacao">Data da Locação</Label>
              <Input
                id="data_locacao"
                type="date"
                value={formData.data_locacao}
                onChange={(e) =>
                  setFormData({ ...formData, data_locacao: e.target.value })
                }
              />
              <div className="h-1 text-sm text-red-500">
                {errors.data_locacao && <span>{errors.data_locacao}</span>}
              </div>
            </div>

            {/* Data devolução */}
            <div className="space-y-1">
              <Label htmlFor="data_prevista_devolucao">
                Data Prevista de Devolução
              </Label>
              <Input
                id="data_prevista_devolucao"
                type="date"
                value={formData.data_prevista_devolucao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    data_prevista_devolucao: e.target.value,
                  })
                }
              />
              <div className="h-1 text-sm text-red-500">
                {errors.data_prevista_devolucao && (
                  <span>{errors.data_prevista_devolucao}</span>
                )}
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
                disabled={loading}
                className="border-2 border-emerald-500 text-emerald-500 w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-emerald-500 w-full sm:w-auto"
              >
                {loading ? "Enviando..." : "Confirmar Empréstimo"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <AlertDialog
        open={confirmDialogOpen}
        onOpenChange={handleCloseConfirmDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Empréstimo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja realizar o empréstimo do livro "
              {livro.titulo}" para {formData.nome_cliente}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-emerald-500 w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}