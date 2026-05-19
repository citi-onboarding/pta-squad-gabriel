'use client';

import Image from 'next/image';
import { LogoCITi } from '../assets';
import { Emprestimo } from '../components/ModalEmprestimo';
import type { EmprestDataProps } from '../components/ModalEmprestimo';
import CadastrarLivro from '@/components/CadastrarLivro';

export default function Home() {
  const livroMock = {
    id: 1,
    titulo: 'O Guia do Mochileiro das Galáxias',
  };

  function handleConfirm(dados: EmprestDataProps) {
    console.log('Empréstimo confirmado:', dados);
  }

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
      <div>
        <Image src={LogoCITi} alt="Logo citi" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <CadastrarLivro></CadastrarLivro>
        <Emprestimo
          livro={livroMock}
          onConfirm={handleConfirm}
        />
        <p className="text-white text-xl">
          Made with <strong>&lt; &#x0002F; &gt;</strong> and{' '}
          <strong>&hearts;</strong> by CITi
        </p>
      </div>
    </div>
  );
}