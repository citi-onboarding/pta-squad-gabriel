import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// Componentes
import HeaderMobile from "../src/components/Header";
import BarraDeBusca from "../src/components/BarraDeBusca";
import CardEmprestimo from "../src/components/Card";
import ThemeProviderView from "../src/components/ThemeProvider";
// Services
import { getEmprestimos } from "../src/services/mobile";
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

useEffect(() => {
    async function buscar() {
      try {
        setLoading(true);
        const dados = await getEmprestimos(filtros);
        setEmprestimos(dados);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    buscar();
  }, [filtros]);

// Tela principal para exibir os empréstimos do usuário
export default function MeusEmprestimosScreen() {
  // Estado para armazenar os empréstimos exibidos, inicialmente vazia
  const [emprestimos, setEmprestimos] = useState<Emprestimo[] | null>(null);

  // Função para normalizar texto, removendo acentos e convertendo para minúsculas
  const normalizar = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();


  // Função para filtrar os empréstimos com base na busca do usuário
  const handleBuscar = async (nomeCliente: string) => {
    const filtrado = emprestimosRaw.filter((e) =>
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