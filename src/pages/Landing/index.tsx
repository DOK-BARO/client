import { APP_NAME } from "@/data/constants";
import styles from "./_landing.module.scss";
import Button from "@/components/atom/Button/Button";
import useLoginAction from "@/hooks/useLoginAction";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/data/routes";
import { EXTERNAL_SERVICE_INTRODUCTION_PAGE } from "@/data/constants";

export default function Index() {
  const navigate = useNavigate();
  const { handleAuthenticatedAction } = useLoginAction();
  return (
    <section className={styles["container"]}>
      <h2 className={styles["title"]}>개발자 북퀴즈 플랫폼</h2>
      <h3 className={styles["desc"]}>
        똑바로 읽었는지 <span className={styles["app-name"]}>{APP_NAME}</span>가
        확인해 드릴게요
      </h3>
      <div className={styles["button-area"]}>
        <Button
          onClick={() =>
            handleAuthenticatedAction(() => {
              navigate(ROUTES.CREATE_QUIZ());
            })
          }
          color="primary"
        >
          퀴즈 만들기
        </Button>
        <Button
          onClick={() => window.open(EXTERNAL_SERVICE_INTRODUCTION_PAGE)}
          color="white"
        >
          상세기능 보기 ↗
        </Button>
      </div>
      <img src="/assets/image/landingimage.svg" />
    </section>
  );
}
