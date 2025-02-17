import styles from "./_header_quiz_util_list.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import pencil from "/public/assets/svg/header/pencil.svg";
import checkSquare from "/public/assets/svg/header/check-square.svg";
import ROUTES from "@/data/routes";
import useLoginAction from "@/hooks/useLoginAction";
import toast from "react-hot-toast";
import Button from "@/components/atom/Button/Button";
interface Props {
  closeDropDownList: () => void;
}

export default function HeaderQuizUtilList({ closeDropDownList }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleAuthenticatedAction } = useLoginAction(pathname);

  const onClickMakeQuiz = () => {
    closeDropDownList();
    handleAuthenticatedAction(() => navigate(ROUTES.CREATE_QUIZ()));
  };

  const onClickDoingQuiz = () => {
    closeDropDownList();
    if (pathname === ROUTES.BOOK_LIST) {
      toast("퀴즈를 풀 책을 선택해 주세요.", {
        icon: "🔍",
      });
    }
    navigate(ROUTES.BOOK_LIST);
  };

  const headerQuizUtilList = [
    { icon: pencil, title: "퀴즈 만들기", onClick: onClickMakeQuiz },
    { icon: checkSquare, title: "퀴즈 풀기", onClick: onClickDoingQuiz },
  ];

  return (
    <ul className={styles["header-quiz-util-list"]}>
      {headerQuizUtilList.map((item) => (
        <li>
          <Button
            className={styles["header-quiz-util-list-item"]}
            icon={<img src={item.icon} width={24} height={24} alt="" />}
            iconPosition="left"
            onClick={item.onClick}
          >
            <span>{item.title}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
