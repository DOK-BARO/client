import styles from "../../../styles/components/_progressbar.module.scss";
export default function ProgressBar({ ratio }: { ratio: number }) {
  const widthPercent = `${ratio * 100}%`;
  return (
    <div className={styles["progress-container"]}>
      <div className={styles["progress-bar"]} style={{ width: widthPercent }} />
    </div>
  );
}
