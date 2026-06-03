
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// Componentes
import HeaderMobile from "../src/components/Header";
import BarraDeBusca from "../src/components/BarraDeBusca";
import CardEmprestimo from "../src/components/Card";
import ThemeProviderView from "../src/components/ThemeProvider";
// Tipos e dados mockados
type StatusEmprestimo = "Em_andamento" | "Devolvido" | "Atrasado";

// Interface para representar um empréstimo
interface Emprestimo {
  id: string;
  nomeCliente: string;
  tituloLivro: string;
  status: StatusEmprestimo;
  dataLocacao: string;
  dataDevolucao: string;
  imagemUri?: string;
}

// Dados mockados de empréstimos para demonstração
const EMPRESTIMOS_MOCK: Emprestimo[] = [
  {
    id: "1",
    nomeCliente: "João Silva",
    tituloLivro: "Dom Casmurro",
    status: "Devolvido",
    dataLocacao: "22/03/2026",
    dataDevolucao: "12/03/2026",
    imagemUri: "https://m.media-amazon.com/images/I/61x1ZHomWUL.jpg",
  },
  {
    id: "2",
    nomeCliente: "João Silva",
    tituloLivro: "Clean Code",
    status: "Em_andamento",
    dataLocacao: "15/04/2026",
    dataDevolucao: "30/04/2026",
    imagemUri: "https://m.media-amazon.com/images/I/71nj3JM-igL.jpg",
  },
  {
    id: "3",
    nomeCliente: "Maria Souza",
    tituloLivro: "História do Brasil",
    status: "Atrasado",
    dataLocacao: "01/03/2026",
    dataDevolucao: "15/03/2026",
    imagemUri: "https://m.media-amazon.com/images/I/714FRIRxxkL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    nomeCliente: "Carlos Lima",
    tituloLivro: "Introdução à Ciência",
    status: "Em_andamento",
    dataLocacao: "20/04/2026",
    dataDevolucao: "05/05/2026",
    imagemUri: "https://livraria.ufsc.br/DynamicItems/Catalog/010d1781-43e1-41f6-b893-be37d02321a69788532807908_W270.jpg",
  },
  {
    id: "5",
    nomeCliente: "Maria Souza",
    tituloLivro: "O Pequeno Príncipe",
    status: "Devolvido",
    dataLocacao: "10/03/2026",
    dataDevolucao: "25/03/2026",
    imagemUri: "https://upload.wikimedia.org/wikipedia/pt/4/47/O-pequeno-príncipe.jpg",
  },
];

// Tela principal para exibir os empréstimos do usuário
export default function MeusEmprestimosScreen() {
  // Estado para armazenar os empréstimos exibidos, inicialmente vazia
  const [emprestimos, setEmprestimos] = useState<Emprestimo[] | null>(null);

  // Função para normalizar texto, removendo acentos e convertendo para minúsculas
  const normalizar = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


  // Função para filtrar os empréstimos com base na busca do usuário
  const handleBuscar = async (nomeCliente: string) => {
    const filtrado = EMPRESTIMOS_MOCK.filter((e) =>
      normalizar(e.nomeCliente).includes(normalizar(nomeCliente))
    );
    setEmprestimos(filtrado);
  };

  return (
    // Envolvemos a tela com o ThemeProviderView para aplicar o tema global
    <ThemeProviderView>
      {/* Cabeçalho da tela */}
      <HeaderMobile />

      {/* Barra de busca */}
      <BarraDeBusca onBuscar={handleBuscar} />

      {/* Texto de resultado */}
      <Text style={styles.resultadoTexto}>
        {emprestimos ? emprestimos.length : 0} empréstimo(s) encontrado(s)
      </Text>

      {/* Lista de empréstimos */}
      <FlatList
        data={emprestimos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // Renderiza um card para cada empréstimo na lista
          <CardEmprestimo
            tituloLivro={item.tituloLivro}
            status={item.status}
            dataLocacao={item.dataLocacao}
            dataDevolucao={item.dataDevolucao}
            imagemUri={item.imagemUri}
          />
        )}
      />
    </ThemeProviderView>
  );
}

// Estilos para a tela de empréstimos
const styles = StyleSheet.create({
  resultadoTexto: {
    fontSize: 13,
    color: "#6b7280",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  lista: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },
});