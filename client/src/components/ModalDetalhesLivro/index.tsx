"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Label } from "@/components/ui/label";
import { Eye, MailIcon, Loader2 } from "lucide-react";
import romanceImg from "../../../../assets/categoriasCard/romance.png";
import tecnologiaImg from "../../../../assets/categoriasCard/tecnologia.png";
import historiaImg from "../../../../assets/categoriasCard/historia.png";
import cienciasImg from "../../../../assets/categoriasCard/ciencias.png";
import infantilImg from "../../../../assets/categoriasCard/infantil.png";
import { Categoria, Livro, Emprestimo, StatusEmprestimo } from "@/types/index";

const imagensCategorias: Record<Categoria, any> = {
  Romance: romanceImg,
  Tecnologia: tecnologiaImg,
  Historia: historiaImg,
  Ciencias: cienciasImg,
  Infantil: infantilImg,
};

interface ModalDetalhesLivroProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  livro: Livro;
  emprestimos: Emprestimo[];
  onAtualizarStatus?: (livroId: string, emprestimoId: string, novoStatus: StatusEmprestimo) => void;
}

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();

  const styles: Record<string, string> = {
    em_andamento: "border border-yellow-400 text-yellow-700 bg-yellow-100",
    atrasado: "border border-red-400 text-red-700 bg-red-100",
    devolvido: "border border-emerald-400 text-emerald-700 bg-emerald-100",
  };

  const className =
    styles[key] || "border border-gray-300 text-gray-600 bg-gray-50";

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap leading-none inline-flex items-center ${className}`}
    >
      {status}
    </span>
  );
}

export function ModalDetalhesLivro({
  open,
  onOpenChange,
  livro,
  emprestimos,
  onAtualizarStatus,
}: ModalDetalhesLivroProps) {
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleEnviarLembrete = (emprestimo: Emprestimo) => {
    alert(`Lembrete enviado para ${emprestimo.nome_cliente} (${emprestimo.email_cliente})`);
  };

  const handleConfirmarDevolucao = async (emprestimoId: string) => {
    setConfirmandoId(null);
    setLoadingId(emprestimoId);
    await fetch(`/emprestimos/${emprestimoId}/devolver`, { method: "PATCH" });
    onAtualizarStatus?.(livro.id, emprestimoId, 'Devolvido');
    setLoadingId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-[800px]
          max-h-[90vh]
          overflow-y-auto
          p-0
          rounded-lg
          bg-white
          shadow-xl
          !m-0
        "
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Detalhes do Livro
          </DialogTitle>
          <DialogDescription className="sr-only">
            Informações detalhadas do livro e histórico de empréstimos.
          </DialogDescription>
        </DialogHeader>

        <div className="border-t border-gray-200" />

        <div className="flex flex-col sm:flex-row gap-4 px-6 py-3">
          <div className="w-full sm:w-44 h-62 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <Image
              src={livro.foto_url || imagensCategorias[livro.categoria]}
              alt={`Capa de ${livro.titulo}`}
              width={176}
              height={248}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 sm:pl-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-1 truncate">
              {livro.titulo}
            </h2>
            <p className="text-base text-gray-500 mb-2">{livro.autor}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  ISBN
                </Label>
                <p className="text-base text-gray-900">{livro.isbn}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  Categoria
                </Label>
                <p className="text-base text-emerald-500 capitalize">
                  {livro.categoria.charAt(0) +
                    livro.categoria.slice(1).toLowerCase()}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  Editora
                </Label>
                <p className="text-base text-gray-900">{livro.editora}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  Ano
                </Label>
                <p className="text-base text-gray-900">{livro.ano}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  Quantidade Total
                </Label>
                <p className="text-base text-gray-900">
                  {livro.quantidade_total} unidades
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 font-medium tracking-wide">
                  Quantidade Disponível
                </Label>
                <p className="text-base text-emerald-500">
                  {livro.quantidade_disponivel} unidades
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div className="px-6 py-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Histórico de Empréstimos
          </h1>
          {!emprestimos || emprestimos.length === 0 ? (
            <p className="text-sm text-gray-400">
              Nenhum empréstimo registrado.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {emprestimos.map((emprestimo) => (
                <div
                  key={emprestimo.id}
                  className="border border-gray-200 rounded-lg px-4 py-3"
                >
                  <div className="flex flex-col min-[460px]:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 w-full min-[460px]:w-auto">
                      <span className="text-base font-semibold text-gray-800 truncate">
                        {emprestimo.nome_cliente}
                      </span>
                      <StatusBadge status={emprestimo.status} />
                    </div>

                    <div className="flex gap-2 w-full min-[460px]:w-auto">
                      {emprestimo.status.toLowerCase() === "em_andamento" && (
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white w-full min-[460px]:w-auto inline-flex items-center justify-center gap-2 px-5 h-12"
                          disabled={loadingId === emprestimo.id}
                          onClick={() =>
                            setConfirmandoId(emprestimo.id)
                          }
                        >
                          {loadingId === emprestimo.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <span className="text-sm font-semibold leading-none">
                              Confirmar Devolução
                            </span>
                          )}
                        </Button>
                      )}

                      {emprestimo.status.toLowerCase() === "atrasado" && (
                        <Button
                          variant="outline"
                          className="border-2 border-emerald-500 text-emerald-500 w-full min-[460px]:w-auto inline-flex items-center justify-center gap-2 px-5 h-12"
                          onClick={() => handleEnviarLembrete(emprestimo)}
                        >
                          <MailIcon className="w-4 h-4" />
                          <span className="text-sm font-semibold leading-none">
                            Enviar Lembrete
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mt-1">
                    {emprestimo.email_cliente}
                  </p>

                  <div className="flex gap-4 mt-2 text-base text-gray-500">
                    <span>
                      Locação:{" "}
                      <span className="text-gray-900">
                        {emprestimo.data_locacao}
                      </span>
                    </span>
                    <span>
                      Previsão:{" "}
                      <span className="text-gray-900">
                        {emprestimo.data_prevista_devolucao}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <AlertDialog
          open={!!confirmandoId}
          onOpenChange={(open) => {
            if (!open) setConfirmandoId(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Devolução</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja devolver este livro?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() =>
                  confirmandoId && handleConfirmarDevolucao(confirmandoId)
                }
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
