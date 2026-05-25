"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const nomesCategorias: Record<string, string> = {
  Romance: "Romance",
  Infantil: "Infantil",
  Tecnologia: "Tecnologia",
  Historia: "História",  
  Ciencias: "Ciências",    
};

//cor definida pelo cliente p cada categoria
const coresCategorias: { [key: string]: string } = {
  Romance: "#ef4444",    // vermelho
  Tecnologia: "#3b82f6", // azul
  Historia: "#f97316",   // laranja
  Ciencias: "#22c55e",   // verde
  Infantil: "#a855f7",   // roxo
};

type DadosGrafico = {
  categoria: string;
  quantidade: number;
};

type GraficoLivrosProps = {
  dados: DadosGrafico[];
};

export default function GraficoLivros({ dados }: GraficoLivrosProps) {
  return (
    // ResponsiveContainer faz o gráfico ocupar 100% da largura do container pai e ter altura fixa de 300px
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={dados}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >

        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey="categoria" 
        tickFormatter={(value) => nomesCategorias[value] || value} />

        <YAxis />

        <Tooltip
          formatter={(value) => [value, "Quantidade"]}
          labelFormatter={(label) => `Categoria: ${nomesCategorias[label] || label}`}
        />

        <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
          {/* Cell aplica a cor de cada barra individualmente */}
          {dados.map((entry) => (
            <Cell
              key={entry.categoria}
              fill={coresCategorias[entry.categoria]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}