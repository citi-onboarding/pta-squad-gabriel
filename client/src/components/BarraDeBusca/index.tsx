"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BarraDeBuscarProps = {
  filtros: {
    busca: string;
    categoria: string;
    disponibilidade: string;
  };
  onChange: (filtros: {
    busca: string;
    categoria: string;
    disponibilidade: string;
  }) => void;
};

export default function BarraDeBuscar({
  filtros,
  onChange,
}: BarraDeBuscarProps) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 bg-white rounded-xl shadow-md p-4 sm:flex-row sm:items-center">
      <div className="relative w-full flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <Input
          type="text"
          value={filtros.busca}
          onChange={(e) => onChange({ ...filtros, busca: e.target.value })}
          placeholder="Buscar por título ou autor..."
          className="w-full pl-10 rounded-xl"
        />
      </div>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:w-auto">
        <Select
          value={filtros.categoria}
          onValueChange={(value) => onChange({ ...filtros, categoria: value })}
        >
          <SelectTrigger className="w-full rounded-xl sm:w-[160px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>

            <SelectItem value="Romance">Romance</SelectItem>

            <SelectItem value="Infantil">Infantil</SelectItem>

            <SelectItem value="Tecnologia">Tecnologia</SelectItem>

            <SelectItem value="Historia">História</SelectItem>

            <SelectItem value="Ciencias">Ciências</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filtros.disponibilidade}
          onValueChange={(value) =>
            onChange({ ...filtros, disponibilidade: value })
          }
        >
          <SelectTrigger className="w-full rounded-xl sm:w-[160px]">
            <SelectValue placeholder="Disponibilidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>
            <SelectItem value="Disponíveis">Disponíveis</SelectItem>
            <SelectItem value="Indisponíveis">Indisponíveis</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
