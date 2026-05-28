import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface BarraDeBuscaProps {
    emprestimos: Emprestimo[];
    onBuscar: (busca: string) => Promise<void>;
}

export default function BarraDeBusca({ emprestimos, onBuscar }: BarraDeBuscaProps) {
    const [busca, setBusca] = useState("");

  return (
    <View>
        <Ionicons name="search" size={24} color="black" />
      <TextInput
        placeholder={emprestimos[0]?.nome_cliente}
        value={busca}
        onChangeText={setBusca}
      />
      <TouchableOpacity 
      onPress={() => onBuscar(busca)}
      className="bg-emerald-600 p-2 rounded">
        <Text>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}