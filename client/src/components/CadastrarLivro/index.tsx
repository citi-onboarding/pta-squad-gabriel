"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
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
import { Categoria } from "@/types";

const categoriaParaEnum: Record<Categoria, string> = {
  Romance: "Romance",
  Tecnologia: "Tecnologia",
  Historia: "Historia",
  Ciencias: "Ciencias",
  Infantil: "Infantil",
};

const categorias: { label: string; value: Categoria }[] = [
  { label: "Romance", value: "Romance" },
  { label: "Tecnologia", value: "Tecnologia" },
  { label: "História", value: "Historia" },
  { label: "Ciências", value: "Ciencias" },
  { label: "Infantil", value: "Infantil" },
];

interface CadastrarLivroProps {
  onCadastrar: (livro: any) => Promise<void>;
  onCancelar: () => void;
}

//Componente para cadastrar um novo livro
export default function CadastrarLivro({
  onCadastrar,
  onCancelar,
}: CadastrarLivroProps) {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    editora: "",
    ano: "",
    quantidade_total: "",
    categoria: "" as Categoria | "",
    foto_url: "",
  });

  //Função para atualizar o estado do formulário
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let valorFiltrado = value;

    if (name === "isbn" || name === "quantidade_total") {
      valorFiltrado = value.replace(/\D/g, "");
    }
    setForm({ ...form, [name]: valorFiltrado });
  }

  function handleCategoriaChange(value: Categoria) {
    setForm((prev) => ({ ...prev, categoria: value }));
    if (erros.categoria) {
      setErros((prev) => ({ ...prev, categoria: false }));
    }
  }

  //Estado para armazenar os erros de validação
  const [erros, setErros] = useState({
    titulo: false,
    autor: false,
    isbn: false,
    editora: false,
    ano: false,
    quantidade_total: false,
    categoria: false,
    foto_url: false,
  });

  function validar() {
    const novosErros = {
      titulo: form.titulo === "",
      autor: form.autor === "",
      isbn: !/^\d{10}$|^\d{13}$/.test(form.isbn),
      editora: form.editora === "",
      ano:
        form.ano === "" ||
        Number(form.ano) < 1000 ||
        Number(form.ano) > new Date().getFullYear(),
      quantidade_total:
        form.quantidade_total === "" ||
        Number(form.quantidade_total) < 1 ||
        isNaN(Number(form.quantidade_total)),
      categoria: form.categoria === "",
      foto_url: false,
    };

    setErros(novosErros);

    // Se houver algum erro, não enviar o formulário
    if (Object.values(novosErros).some((erro) => erro)) return false;

    return true;
  }

  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setForm({
      titulo: "",
      autor: "",
      isbn: "",
      editora: "",
      ano: "",
      quantidade_total: "",
      categoria: "",
      foto_url: "",
    });
    setErros({
      titulo: false,
      autor: false,
      isbn: false,
      editora: false,
      ano: false,
      quantidade_total: false,
      categoria: false,
      foto_url: false,
    });
  }

  async function handleSubmit() {
    if (!validar()) return;

    setSubmitting(true);

    const livro = {
      titulo: form.titulo.trim(),
      autor: form.autor.trim(),
      isbn: form.isbn.trim(),
      editora: form.editora.trim(),
      ano: Number(form.ano),
      quantidade_total: Number(form.quantidade_total),
      categoria: categoriaParaEnum[form.categoria as Categoria],
      foto_url: form.foto_url.trim(),
    };

    try {
      await onCadastrar(livro);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar livro.");
    } finally {
      setSubmitting(false);
    }
  }
  //Função para limpar o formulário
  function handleCancelar() {
    onCancelar();
    resetForm();
  }

  const [confirmDialog, setConfirmDialog] = useState<"save" | "cancel" | null>(
    null,
  );

  function handleSaveClick() {
    if (validar()) {
      setConfirmDialog("save");
    }
  }

  function handleCancelClick() {
    setConfirmDialog("cancel");
  }

  function confirmSave() {
    setConfirmDialog(null);
    handleSubmit();
  }

  function confirmCancel() {
    setConfirmDialog(null);
    handleCancelar();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 flex justify-center">
      {/* Div geral */}
      <div className="w-full max-w-4xl">
        {/* Título da página */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Cadastrar Novo Livro
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Adicione um novo livro ao acervo
        </p>

        {/* Campo do formulario */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 md:p-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Titulo */}
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Título
              </Label>
              <Input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Digite o título do livro"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.titulo ? "visible" : "invisible"
                }`}
              >
                *Este campo é obrigatório
              </p>
            </div>

            {/* Autor */}
            <div>
              <Label className="text-sm font-medium text-gray-900">Autor</Label>
              <Input
                name="autor"
                value={form.autor}
                onChange={handleChange}
                placeholder="Digite o nome do autor"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.autor ? "visible" : "invisible"
                }`}
              >
                *Este campo é obrigatório
              </p>
            </div>

            {/* ISBN */}
            <div>
              <Label className="text-sm font-medium text-gray-900">ISBN</Label>
              <Input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                placeholder="Digite o ISBN"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.isbn ? "visible" : "invisible"
                }`}
              >
                *ISBN deve ter 10 ou 13 dígitos numéricos
              </p>
            </div>

            {/* Editora */}
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Editora
              </Label>
              <Input
                name="editora"
                value={form.editora}
                onChange={handleChange}
                placeholder="Digite a Editora"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.editora ? "visible" : "invisible"
                }`}
              >
                *Este campo é obrigatório
              </p>
            </div>

            {/* Ano */}
            <div>
              <Label className="text-sm font-medium text-gray-900">Ano</Label>
              <Input
                name="ano"
                value={form.ano}
                onChange={handleChange}
                placeholder="Digite o ano"
                type="number"
                min={1000}
                max={new Date().getFullYear()}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.ano ? "visible" : "invisible"
                }`}
              >
                *Selecione um ano válido
              </p>
            </div>

            {/* Quantidade_total */}
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Quantidade total
              </Label>
              <Input
                name="quantidade_total"
                value={form.quantidade_total}
                onChange={handleChange}
                placeholder="Digite a quantidade total"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.quantidade_total ? "visible" : "invisible"
                }`}
              >
                *Este campo é obrigatório
              </p>
            </div>
          </div>

          {/* Divisor */}
          <hr className="my-6" />

          {/* Categorias */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Categoria
            </Label>
            {/* Botões de categoria -- Logica para mudar a cor dos botões ao clicar -- coloquei tudo em uma lista ao inves de criar separadamente*/}
            <div className="flex gap-3 flex-wrap">
              {categorias.map((categoria) => {
                const categoriaSelecionada = form.categoria === categoria.value;
                return (
                  <Button
                    key={categoria.value}
                    type="button"
                    onClick={() => handleCategoriaChange(categoria.value)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors
            ${
              categoriaSelecionada
                ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50 hover:border-emerald-400"
            }
          `}
                  >
                    {categoria.label}
                  </Button>
                );
              })}
            </div>

            <div>
              {erros.categoria && (
                <p className="text-red-500 text-xs mt-1">
                  *Selecione uma categoria
                </p>
              )}
            </div>
          </div>

          {/* Foto URL */}
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-900">
              URL da Foto (opcional)
            </Label>
            <Input
              name="foto_url"
              value={form.foto_url}
              onChange={handleChange}
              placeholder="https://exemplo.com/capa.jpg"
              className="mt-1"
            />
            <p
              className={`text-red-500 text-xs mt-1 ${
                erros.foto_url ? "visible" : "invisible"
              }`}
            >
              *Insira uma URL válida (ex: https://...)
            </p>
          </div>

          {/* Divisor */}
          <hr className="my-6" />

          {/* Botões */}
          <div className="flex justify-end gap-3">
            {/* Cancelar */}
            <Button
              variant="outline"
              onClick={handleCancelClick}
              disabled={submitting}
              className="border border-emerald-500 text-emerald-600 px-5 py-2 rounded-md text-sm hover:bg-emerald-50"
            >
              Cancelar
            </Button>
            {/* Salvar Livro */}
            <Button
              onClick={handleSaveClick}
              disabled={submitting}
              className="bg-emerald-500 text-white px-5 py-2 rounded-md text-sm hover:bg-emerald-600"
            >
              {submitting ? "Salvando..." : "Salvar Livro"}
            </Button>
          </div>

          <AlertDialog
            open={confirmDialog !== null}
            onOpenChange={() => setConfirmDialog(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {confirmDialog === "save"
                    ? "Confirmar cadastro"
                    : "Cancelar cadastro"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {confirmDialog === "save"
                    ? "Deseja realmente cadastrar este livro?"
                    : "Tem certeza que deseja cancelar? Todos os dados preenchidos serão perdidos."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={
                    confirmDialog === "save" ? confirmSave : confirmCancel
                  }
                  className={
                    confirmDialog === "save"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {confirmDialog === "save" ? "Confirmar" : "Cancelar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
