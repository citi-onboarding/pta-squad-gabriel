import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CalendarDays } from "lucide-react-native";

// Definição das props para o componente CardEmprestimo
interface CardEmprestimoProps {
  tituloLivro: string;
  status: "Em_andamento" | "Devolvido" | "Atrasado";
  dataLocacao: string;
  dataDevolucao: string;
  imagemUri?: string;
}

// Configurações de estilo para cada status
const statusConfig = {
  Devolvido: {
    label: "Devolvido",
    bg: "#e6fbf3",
    border: "#bcf4de",
    text: "#00cbb4",
  },
  Em_andamento: {
    label: "Em andamento",
    bg: "#fef9c3",
    border: "#fde047",
    text: "#ca8a04",
  },
  Atrasado: {
    label: "Atrasado",
    bg: "#fee2e2",
    border: "#fca5a5",
    text: "#ef4444",
  },
};

// Componente CardEmprestimo para exibir informações de empréstimo de livros
export default function CardEmprestimo({
  tituloLivro,
  status,
  dataLocacao,
  dataDevolucao,
  imagemUri,
}: CardEmprestimoProps) {
  const currentStatus = statusConfig[status];

  return (
    // Container principal do card, com estilo definido
    <View style={styles.card}>
      {/* Imagem do livro */}
      {imagemUri ? (
        <Image
          source={{ uri: imagemUri }}
          style={styles.imagem}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagemPlaceholder} />
      )}

      {/* Conteúdo do card */}
      <View style={styles.conteudo}>
        {/* Título do livro */}
        <Text style={styles.titulo}>{tituloLivro}</Text>

        {/* Badge de status */}
        <View
          style={[
            styles.badge,
            { backgroundColor: currentStatus.bg, borderColor: currentStatus.border },
          ]}
        >
          <Text style={[styles.badgeText, { color: currentStatus.text }]}>
            {currentStatus.label}
          </Text>
        </View>

        {/* Informações de data */}
        <View style={styles.dataRow}>
          <CalendarDays size={14} color="#9ca3af" />
          <Text style={styles.dataText}>Locação: {dataLocacao}</Text>
        </View>
        {/* Informação de data de devolução */}
        <View style={styles.dataRow}>
          <CalendarDays size={14} color="#9ca3af" />
          <Text style={styles.dataText}>Devolução: {dataDevolucao}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  imagem: {
    width: 90,
    alignSelf: "stretch",
    flexShrink: 0,
  },
  imagemPlaceholder: {
    width: 90,
    alignSelf: "stretch",
    backgroundColor: "#f3f4f6",
    flexShrink: 0,
  },
  conteudo: {
    flex: 1,
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  titulo: {
    color: "#1f2937",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  dataText: {
    fontSize: 14,
    color: "#6b7280",
  },
});