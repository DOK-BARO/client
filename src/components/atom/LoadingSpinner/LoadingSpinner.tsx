import styles from "./_loading_spinner.module.scss";
import loadingSpinner from "/public/assets/svg/quizBookSelectionForm/loading.gif";

interface LoadingSpinnerProps {
  width?: number;
  className?: string;
  pageCenter?: boolean;
}
export default function LoadingSpinner({
  width,
  className,
  pageCenter,
}: LoadingSpinnerProps) {
  return (
    <img
      className={`${styles.container} ${className} ${pageCenter ? styles["page-center"] : ""}`}
      alt="로딩중"
      width={width}
      height={width}
      src={loadingSpinner}
    />
  );
}
