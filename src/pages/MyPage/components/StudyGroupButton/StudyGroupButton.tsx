import styles from "./_study_group_button.module.scss";

interface Props {
  label: string;
  icon: JSX.Element;
}

export default function StudyGroupButton({ label, icon }: Props) {
  return (
    <button className={styles.button}>
      {icon} {label}
    </button>
  );
}
