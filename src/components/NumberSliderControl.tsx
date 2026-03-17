interface NumberSliderControlProps {
  label: string;
  value: number | string;
  onChange: (val: number | string) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export default function NumberSliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = "px",
}: NumberSliderControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-400 flex justify-between items-center">
        <span>{label}</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) =>
              onChange(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-20 bg-[#0d1117] border border-gray-600 rounded-md text-center py-1 text-[#00a2ff] outline-none focus:border-[#00a2ff] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-gray-500 text-sm">{unit}</span>
        </div>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={Number(value) || 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#00a2ff]"
      />
    </div>
  );
}
