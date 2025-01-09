import styles from "./_study_group_button.module.scss";

interface Props {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

export default function StudyGroupButton({ label, icon, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon} {label}
    </button>
  );
}
