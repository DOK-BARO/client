import styles from "./_tooltip.module.scss";

interface TooltipProps {
  label: string;
  className?: string;
}
export default function Tooltip({
  label,
  className: customClassName,
}: TooltipProps) {
  const className = `${styles.container} ${customClassName ?? ""}`;
  return (
    <article className={className}>
      <p className={styles.label}>{label}</p>
    </article>
  );
}
