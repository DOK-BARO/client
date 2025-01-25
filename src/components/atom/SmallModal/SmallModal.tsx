import Button from "../Button/Button";
import styles from "./_small_modal.module.scss";

interface Props {
  icon?: JSX.Element;
  label: string;
  onLabelClick: () => void;
}

export default function SmallModal({ icon, label, onLabelClick }: Props) {
  return (
    <div className={styles["small-modal"]}>
      <Button
        className={styles["icon-label-container"]}
        onClick={onLabelClick}
        size="small"
      >
        {icon ? icon : null} <p className={styles.label}>{label}</p>
      </Button>
    </div>
  );
}
