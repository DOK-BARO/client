import styles from "./_no-data-section.module.scss";
import Button from "@/components/atom/Button/Button";

interface Props {
  title: string;
  buttonName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NoDataSection = ({ title, buttonName, onClick }: Props) => {
  return (
    <div className={styles["no-data"]}>
      <p>{title}</p>
      {buttonName ? (
        <Button onClick={onClick} color="primary">
          {buttonName}
        </Button>
      ) : null}
    </div>
  );
};
