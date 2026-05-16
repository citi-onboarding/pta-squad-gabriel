"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// Imagens das categorias
import romanceImg from "../../../../assets/categorias/romance.png";
import tecnologiaImg from "../../../../assets/categorias/tecnologia.png";
import historiaImg from "../../../../assets/categorias/historia.png";
import cienciasImg from "../../../../assets/categorias/ciencias.png";
import infantilImg from "../../../../assets/categorias/infantil.png";

//Componente para cadastrar um novo livro
export default function CadastrarLivro() {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    editora: "",
    ano: "",
    quantidade: "",
    categoria: "",
  });

  //Função para atualizar o estado do formulário
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Estado para armazenar os erros de validação
  const [erros, setErros] = useState({
    titulo: false,
    autor: false,
    isbn: false,
    editora: false,
    ano: false,
    quantidade: false,
    categoria: false,
  });

  //Função para validar o formulário e mostrar os erros
  function handleSubmit() {
    const novosErros = {
      titulo: form.titulo === "",
      autor: form.autor === "",
      isbn: !/^\d{10}$|^\d{13}$/.test(form.isbn),
      editora: form.editora === "",
      ano:
        form.ano === "" ||
        Number(form.ano) < 1000 ||
        Number(form.ano) > new Date().getFullYear(),
      quantidade: form.quantidade === "",
      categoria: form.categoria === "",
    };

    setErros(novosErros);

    // Se houver algum erro, não enviar o formulário
    if (Object.values(novosErros).some((erro) => erro)) return;

    console.log("Formulário válido, enviando dados:", form);
  }

  //Função para limpar o formulário
  function handleCancelar() {
    setForm({
      titulo: "",
      autor: "",
      isbn: "",
      editora: "",
      ano: "",
      quantidade: "",
      categoria: "",
    });
    setErros({
      titulo: false,
      autor: false,
      isbn: false,
      editora: false,
      ano: false,
      quantidade: false,
      categoria: false,
    });
  }

  //Relacionando as imagens a suas categorias
  const imagensCategorias: { [key: string]: any } = {
    Romance: romanceImg,
    Tecnologia: tecnologiaImg,
    História: historiaImg,
    Ciências: cienciasImg,
    Infantil: infantilImg,
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Div geral */}
      <div>
        {/* Título da página */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Cadastrar Novo Livro
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Adicione um novo livro ao acervo
        </p>

        {/* Campo do formulario */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-4 md:p-8 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Quantidade */}
            <div>
              <Label className="text-sm font-medium text-gray-900">
                Quantidade
              </Label>
              <Input
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                placeholder="Digite a Quantidade"
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p
                className={`text-red-500 text-xs mt-1 ${
                  erros.quantidade ? "visible" : "invisible"
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
              {[
                "Romance",
                "Tecnologia",
                "História",
                "Ciências",
                "Infantil",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setForm({ ...form, categoria: cat })}
                  className={`border rounded-md p-2 text-sm transition-all flex flex-col items-center gap-2 w-36
                    ${
                      form.categoria === cat
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium"
                        : "border-gray-300 text-gray-600 hover:border-emerald-400"
                    }`}
                >
                  {/* Foto */}
                  <div className="w-28 h-28 rounded-md overflow-hidden">
                    <Image
                      src={imagensCategorias[cat]}
                      alt={cat}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </button>
              ))}
            </div>
            <p
              className={`text-red-500 text-xs mt-1 ${
                erros.categoria ? "visible" : "invisible"
              }`}
            >
              *Selecione pelo menos uma categoria
            </p>
          </div>

          {/* Divisor */}
          <hr className="my-6" />

          {/* Botões */}
          <div className="flex justify-end gap-3">
            {/* Cancelar */}
            <Button
              variant="outline"
              onClick={handleCancelar}
              className="border border-emerald-500 text-emerald-600 px-5 py-2 rounded-md text-sm hover:bg-emerald-50"
            >
              Cancelar
            </Button>
            {/* Salvar Livro */}
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 text-white px-5 py-2 rounded-md text-sm hover:bg-emerald-600"
            >
              Salvar Livro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
