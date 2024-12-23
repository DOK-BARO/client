import styles from "./_no-data-section.module.scss";
import Button from "@/components/atom/button/button";

export const NoDataSection = ({
  title,
  buttonName,
  onClick,
}: {
  title: string;
  buttonName: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className={styles["no-data"]}>
      <p>{title}</p>
      <Button onClick={onClick} color="primary">
        {buttonName}
      </Button>
    </div>
  );
};