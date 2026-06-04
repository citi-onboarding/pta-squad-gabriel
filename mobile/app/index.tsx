import React, { useState, useEffect } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
// Componentes
import HeaderMobile from "../src/components/Header";
import BarraDeBusca from "../src/components/BarraDeBusca";
import CardEmprestimo from "../src/components/Card";
import ThemeProviderView from "../src/components/ThemeProvider";
// Services
import { getEmprestimos } from "../src/services/mobile";
// Tipos
import { EmprestimoWithCliente } from "../src/types/index";

// Tela principal para exibir os empréstimos do usuário
export default function MeusEmprestimosScreen() {
  // Estado para armazenar os empréstimos exibidos, inicialmente vazia
  const [emprestimos, setEmprestimos] = useState<
    EmprestimoWithCliente[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const formatarData = (valor: string | Date) =>
    new Date(valor).toLocaleDateString("pt-BR");

  // Função para filtrar os empréstimos com base na busca do usuário
  const handleBuscar = async (nomeCliente: string) => {
    try {
      setLoading(true);
      if (nomeCliente.trim() === "") {
        setEmprestimos([]);
        return;
      }
      const dados = await getEmprestimos(nomeCliente);
      setEmprestimos(dados);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            tituloLivro={item.titulo_livro}
            status={item.status}
            dataLocacao={formatarData(item.data_locacao)}
            dataDevolucao={formatarData(item.data_prevista_devolucao)}
            imagemUri={item.foto_url || undefined}
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
