import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Search } from "lucide-react-native";

interface BarraDeBuscaProps {
  onBuscar: (busca: string) => Promise<void>;
}

export default function BarraDeBusca({ onBuscar }: BarraDeBuscaProps) {
  const [busca, setBusca] = useState("");

  return (
    <View className="flex-row items-start gap-2 px-3 py-3">
      <View className="flex-1 flex-row rounded-xl border border-slate-200 bg-white px-3 py-2">
        <Search size={18} color="#64748b" className="my-1 shrink-0" />
        <TextInput
          placeholder="Nome"
          value={busca}
          onChangeText={setBusca}
          className="ml-2 text-slate-900 text-lg"
          placeholderTextColor="#94a3b8"
        />
      </View>

      <TouchableOpacity
        onPress={() => onBuscar(busca)}
        className="rounded-xl bg-emerald-500 px-3 py-3"
      >
        <Text className="font-semibold text-white">Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}
