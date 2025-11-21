import { cn } from '@/lib/utils/classNames';
import styles from './Chip.module.scss';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  category?: string;
  categoryColor?: {
    bg: string;
    text: string;
    border: string;
  };
}

export default function Chip({
  label,
  selected = false,
  onClick,
  className,
  categoryColor,
}: ChipProps) {
  const style =
    categoryColor && selected
      ? {
          backgroundColor: categoryColor.bg,
          color: categoryColor.text,
          borderColor: categoryColor.border,
        }
      : categoryColor && !selected
        ? {
            borderColor: categoryColor.border,
          }
        : undefined;

  return (
    <button
      type="button"
      className={cn(styles.chip, selected && styles.selected, className)}
      onClick={onClick}
      aria-pressed={selected}
      style={style}
    >
      {label}
    </button>
  );
}
