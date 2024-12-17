import { ReactElement } from "react";
import styles from "./_icon_text_label.module.scss";

interface Props {
  icon: ReactElement<SVGElement>;
  labelText: string;
}
export default function IconTextLabel({ icon, labelText }: Props) {
  return (
    <span className={styles.container}>
      {icon}
      {labelText}
    </span>
  );
}
