import type { ChoiceOption } from '../../types/quiz';

export interface AnswerOptionProps {
  option: ChoiceOption;
  selected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  isMultiple?: boolean;
}

export default function AnswerOption({
  option,
  selected,
  onSelect,
  disabled = false,
  isMultiple = false,
}: AnswerOptionProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      onSelect(option.id);
    }
  };

  return (
    <div
      role={isMultiple ? 'checkbox' : 'radio'}
      aria-checked={selected}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect(option.id)}
      onKeyDown={handleKeyDown}
      class={`flex items-start gap-3 p-3.5 sm:p-4 min-h-[48px] rounded-xl border transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
        selected
          ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] text-[var(--color-text)] shadow-sm'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-text-dim)] hover:bg-[var(--color-surface-hover)]'
      } ${disabled ? 'opacity-75 cursor-default' : ''}`}
    >
      <div
        class={`w-5 h-5 rounded-${
          isMultiple ? 'md' : 'full'
        } border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          selected
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
            : 'border-[var(--color-border)] bg-[var(--color-surface)]'
        }`}
        aria-hidden="true"
      >
        {selected && (
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium leading-snug">{option.label}</div>
        {option.sublabel && (
          <div class="text-xs text-[var(--color-text-muted)] mt-1">{option.sublabel}</div>
        )}
      </div>
    </div>
  );
}
