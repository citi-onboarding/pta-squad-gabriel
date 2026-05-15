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
import { useState } from "react";



export default function BarraDeBuscar() {
  const [categoria, setCategoria] = useState("todas");
  return (
    <div className="max-w-6xl mx-auto mt-24 flex items-center gap-4 bg-white rounded-xl shadow-md p-4">
      
      <div className="relative flex-1">

        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <Input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="w-full pl-10 rounded-xl"
        />

      </div>

        <Select 
        value={categoria}
        onValueChange={setCategoria}
        >
          <SelectTrigger className="w-[220px] rounded-xl">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="todas">
              Todas
            </SelectItem>

            <SelectItem value="romance">
              Romance
            </SelectItem>

            <SelectItem value="infantil">
              Infantil
            </SelectItem>

            <SelectItem value="tecnologia">
              Tecnologia
            </SelectItem>

            <SelectItem value="historia">
              História
            </SelectItem>

            <SelectItem value="ciencias">
              Ciências
            </SelectItem>

          </SelectContent>
        </Select>
    </div>
  );
}