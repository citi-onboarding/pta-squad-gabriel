import { LucideIcon } from 'lucide-react';

interface CardMetricasProps {
    valor: number,
    descricao: string,
    Icon: LucideIcon,
    cor:string,
}

function CardMetricas({ valor, descricao, Icon, cor = "blue" }: CardMetricasProps) {
  const cores = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md drop-shadow-md">
      <div className="flex items-center justify-start space-x-3">
        <div className={`p-3 ${cores[cor]} rounded-md`}>
          <Icon size={28} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">{descricao}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-2">{valor}</p>
        </div>
      </div>
    </div>
  );
}

export default CardMetricas;