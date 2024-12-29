import Button from "../button/button";
import styles from "./_small_modal.module.scss";

interface Prop {
  icon?: JSX.Element;
  label: string;
  handleLabelClick: () => void;
}

export default function SmallModal({ icon, label, handleLabelClick }: Prop) {
  return (
    <div className={styles["small-modal"]}>
      <Button
        className={styles["icon-label-container"]}
        onClick={handleLabelClick}
        size="small"
      >
        {icon ? icon : null} <p className={styles.label}>{label}</p>
      </Button>
    </div>
  );
}
