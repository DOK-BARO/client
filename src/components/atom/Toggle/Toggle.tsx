import styles from "./_toggle.module.scss";

interface Props {
  onClick?: () => void;
  isActive?: boolean;
}
export default function Toggle({ onClick = () => {}, isActive }: Props) {
  return (
    <div
      className={`${styles["toggle-container"]} ${
        isActive ? styles.on : styles.off
      }`}
    >
      <button
        className={`${styles["toggle"]} ${isActive ? styles.on : styles.off}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label=""
      >
        <div className={styles.circle} />
      </button>
    </div>
  );
}
