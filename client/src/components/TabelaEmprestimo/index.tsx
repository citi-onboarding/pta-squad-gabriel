import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LivroResumido, Emprestimo } from "@/types";

type TabelaEmprestimoProps = {
  livro: LivroResumido[];
  emprestimos: Record<string, Emprestimo[]>;
};

export function TabelaEmprestimos({
  livro,
  emprestimos,
}: TabelaEmprestimoProps) {
  const todosEmprestimos: Emprestimo[] = Object.values(emprestimos).flat();
  return (
    <div className="border rounded-md bg-white px-5 py-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Últimos Empréstimos
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Livro</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data de Locação</TableHead>
            <TableHead>Data de Devolução</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todosEmprestimos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhum empréstimo registrado.
              </TableCell>
            </TableRow>
          ) : (
            todosEmprestimos.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  {livro[emp.livroId]?.titulo ?? "Livro não encontrado"}
                </TableCell>
                <TableCell>{emp.nome_cliente}</TableCell>
                <TableCell>{emp.data_locacao}</TableCell>
                <TableCell>{emp.data_prevista_devolucao}</TableCell>
                <TableCell>{emp.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
