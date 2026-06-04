import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Search } from "lucide-react-native";

interface BarraDeBuscaProps {
  onBuscar: (busca: string) => Promise<void>;
}

export default function BarraDeBusca({ onBuscar }: BarraDeBuscaProps) {
  const [busca, setBusca] = useState("");

  const handleBuscar = async () => {
    const termoBusca = busca.trim();

    if (termoBusca === "") {
      return;
    }
    await onBuscar(termoBusca);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={18} color="#64748b" />
        <TextInput
          placeholder="Nome"
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <TouchableOpacity onPress={handleBuscar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  botaoTexto: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});