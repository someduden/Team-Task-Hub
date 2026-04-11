type Props = {
  value: number;
};

export function ProgressBar({ value }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="h-3 rounded-full bg-black transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
