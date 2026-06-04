import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { StatusEmprestimo } from "@/types";
import { StatusBadge } from "../StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { MailIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { BookCheckIcon } from "lucide-react";
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
import { sendEmail } from "@/services/emprestimoService";
import { toast } from "sonner";
import type { DashboardLatestLoan } from "@/services/dashboardService";

type EmprestimoTabela = Pick<
  DashboardLatestLoan,
  | "id"
  | "livro_titulo"
  | "nome_cliente"
  | "data_locacao"
  | "data_prevista_devolucao"
  | "status"
>;

type TabelaEmprestimoProps = {
  emprestimos: EmprestimoTabela[];
  onConfirmarDevolucao?: (emprestimoId: string) => Promise<void>;
};

type FilterStatus = StatusEmprestimo | "Todos";

export function TabelaEmprestimos({
  emprestimos,
  onConfirmarDevolucao,
}: TabelaEmprestimoProps) {
  const [statusFilter, setStatusFilter] = useState<FilterStatus | undefined>(
    undefined,
  );
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString("pt-BR");

  const handleEnviarLembrete = async (emprestimo: EmprestimoTabela) => {
    const toastId = toast.loading("Enviando e-mail de lembrete...");
    try {
      await sendEmail(emprestimo.id);
      toast.success("Lembrete enviado com sucesso!", { id: toastId });
    } catch (error) {
      console.error("Erro ao enviar lembrete:", error);
      toast.error("Erro ao enviar o lembrete.", { id: toastId });
    }
  };

  const handleConfirmarDevolucao = async (emprestimoId: string) => {
    setConfirmandoId(null);
    setLoadingId(emprestimoId);
    await onConfirmarDevolucao?.(emprestimoId);
    setLoadingId(null);
  };

  const emprestimosFiltrados: EmprestimoTabela[] =
    statusFilter === "Todos" || !statusFilter
      ? emprestimos
      : emprestimos.filter((emp) => emp.status === statusFilter);

  const emprestimosParaExibir =
    statusFilter === "Todos" || !statusFilter
      ? emprestimosFiltrados.slice(0, 5)
      : emprestimosFiltrados;

  return (
    <div className="border rounded-md bg-white px-5 py-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Últimos Empréstimos
        </h2>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as FilterStatus)}
        >
          <SelectTrigger className="w-full rounded-xl sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Em_andamento">Em andamento</SelectItem>
            <SelectItem value="Atrasado">Atrasado</SelectItem>
            <SelectItem value="Devolvido">Devolvido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[760px] table-fixed w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold w-[20%] whitespace-nowrap overflow-hidden text-slate-950 text-ellipsis">
                Livro
              </TableHead>
              <TableHead className="font-semibold w-[20%] whitespace-nowrap overflow-hidden text-slate-950 text-ellipsis">
                Cliente
              </TableHead>
              <TableHead className="font-semibold w-[15%] whitespace-nowrap overflow-hidden text-slate-950 text-ellipsis">
                Data de Locação
              </TableHead>
              <TableHead className="font-semibold w-[15%] whitespace-nowrap overflow-hidden text-slate-950 text-ellipsis">
                Data de Devolução
              </TableHead>
              <TableHead className="font-semibold w-[20%] whitespace-nowrap overflow-hidden text-slate-950 text-ellipsis text-start">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emprestimosParaExibir.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  Nenhum empréstimo registrado.
                </TableCell>
              </TableRow>
            ) : (
              emprestimosParaExibir.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium w-[20%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {emp.livro_titulo}
                  </TableCell>
                  <TableCell className="w-[20%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {emp.nome_cliente}
                  </TableCell>
                  <TableCell className="w-[15%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatarData(emp.data_locacao)}
                  </TableCell>
                  <TableCell className="w-[15%] whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatarData(emp.data_prevista_devolucao)}
                  </TableCell>
                  <TableCell className="w-[30%]">
                    <div className="flex items-center gap-2 justify-start min-h-8">
                      <div className="shrink-0 flex items-center justify-start">
                        <StatusBadge status={emp.status} />
                      </div>
                      <div className="flex items-center gap-0.5 justify-start h-8 min-w-0">
                        {emp.status === "Em_andamento" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 w-8 p-0 shrink-0"
                            disabled={loadingId === emp.id}
                            onClick={() => setConfirmandoId(emp.id)}
                          >
                            {loadingId === emp.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <BookCheckIcon />
                            )}
                          </Button>
                        )}
                        {emp.status === "Atrasado" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500 text-emerald-500 hover:bg-emerald-50 h-8 w-8 p-0"
                            onClick={() => handleEnviarLembrete(emp)}
                          >
                            <MailIcon className="h-4 w-4" />
                          </Button>
                        )}
                        {emp.status === "Devolvido" && (
                          <div
                            className="w-8 h-8 invisible"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!confirmandoId}
        onOpenChange={(open) => !open && setConfirmandoId(null)}
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
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={() =>
                confirmandoId && handleConfirmarDevolucao(confirmandoId)
              }
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
