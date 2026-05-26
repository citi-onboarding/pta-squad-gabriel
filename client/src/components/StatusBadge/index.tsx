export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();

  const styles: Record<string, string> = {
    em_andamento: "border border-yellow-400 text-yellow-700 bg-yellow-100",
    atrasado: "border border-red-400 text-red-700 bg-red-100",
    devolvido: "border border-emerald-400 text-emerald-700 bg-emerald-100",
  };

  const labels: Record<string, string> = {
    em_andamento: "Em andamento",
    atrasado: "Atrasado",
    devolvido: "Devolvido",
  };

  const className =
    styles[key] || "border border-gray-300 text-gray-600 bg-gray-50";

  return (
    <span
      className={`h-7 w-[112px] shrink-0 justify-center text-xs font-medium px-2 rounded-full whitespace-nowrap leading-none inline-flex items-center ${className}`}
    >
      {labels[key] || status}
    </span>
  );
}
