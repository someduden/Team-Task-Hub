type Props = {
  label: string;
  value: number;
};

export function StatsCard({ label, value }: Props) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
