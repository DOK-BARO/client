import { useNavigate } from "react-router-dom";
import styles from "./_not_found.module.scss";
import Button from "@/components/atom/Button/Button";
import ROUTES from "@/data/routes";
import errorImage from "/public/assets/image/404-error-image.png";

export default function NotFound() {
  // TODO: 수정
  const errorImgPath = "/public/assets/svg/notFoundPage/404ErrorImage.svg";

  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate(ROUTES.ROOT);
  };
  return (
    <div className={styles["container"]}>
      <img src={errorImage} alt="없는 페이지 입니다." />
      <Button
        color="primary"
        size="medium"
        onClick={handleGoToHome}
        className={styles["home-btn"]}
      >
        홈으로 이동
      </Button>
    </div>
  );
}
