"use client";

import { Button } from "@/components/ui/button";

// importação do componente de modal de confirmação
interface ModalConfirmacaoProps {
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

// componente de modal de confirmação, usado para confirmar ações como exclusão de livros
export default function ModalConfirmacao({
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoProps) {
  return (
    // fundo
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* card do modal */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
        <p className="text-sm text-gray-500 mt-2">{mensagem}</p>

        {/* botoes */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onCancelar}
            className="bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirmar}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
