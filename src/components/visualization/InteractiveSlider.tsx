export interface InteractiveSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function InteractiveSlider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  description,
  onChange,
  disabled = false,
}: InteractiveSliderProps) {
  return (
    <div class="space-y-2">
      <div class="flex items-center justify-between text-xs">
        <label for={id} class="font-semibold text-[var(--color-text)]">
          {label}
        </label>
        <span class="font-mono font-bold px-2 py-0.5 rounded bg-[var(--color-surface-hover)] text-[var(--color-accent)] border border-[var(--color-border)]">
          {value}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>

      {description && (
        <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">{description}</p>
      )}

      <div class="relative flex items-center">
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onInput={(e) => onChange(parseFloat((e.target as HTMLInputElement).value))}
          class="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-40 disabled:cursor-not-allowed"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value} ${unit}`}
        />
      </div>

      <div class="flex justify-between text-[10px] text-[var(--color-text-dim)] font-mono">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
