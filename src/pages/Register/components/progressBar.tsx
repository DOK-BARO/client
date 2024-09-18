import styles from "../../../styles/components/_progressbar.module.scss";
export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className={styles["progress-container"]}>
      <div
        className={styles["progress-bar"]}
        style={{ width: step === 1 ? "50%" : "100%" }}
      />
    </div>
  );
}
