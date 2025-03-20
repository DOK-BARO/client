import styles from "./_header_quiz_util_list.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
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

  const onClickNavigateBookList = () => {
    closeDropDownList();
    handleAuthenticatedAction(() => navigate(ROUTES.BOOK_LIST));
  };

  const onClickNavigateQuizList = () => {
    // TODO: 퀴즈 리스트 페이지로 이동
    closeDropDownList();
    if (pathname === ROUTES.BOOK_LIST) {
      toast("퀴즈를 풀 책을 선택해 주세요.", {
        icon: "🔍",
      });
    }
    navigate(ROUTES.BOOK_LIST);
  };

  const headerQuizUtilList = [
    { title: "책 리스트", onClick: onClickNavigateBookList },
    { title: "퀴즈 리스트", onClick: onClickNavigateQuizList },
  ];

  return (
    <ul className={styles["header-quiz-util-list"]}>
      {headerQuizUtilList.map((item) => (
        <li key={item.title}>
          <Button
            size="xsmall"
            className={styles["header-quiz-util-list-item"]}
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
