import styles from "./_tooltip.module.scss";

interface Props {
  label: string;
  className?: string;
}
export default function Tooltip({ label, className: customClassName }: Props) {
  const className = `${styles.container} ${customClassName ?? ""}`;
  return (
    <article className={className}>
      <p className={styles.label}>{label}</p>
    </article>
  );
}
