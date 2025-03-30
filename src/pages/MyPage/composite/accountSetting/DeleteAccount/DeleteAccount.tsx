import { useAtom } from "jotai";
import { myPageTitleAtom } from "@/store/myPageAtom";
import { useEffect, useState } from "react";
import styles from "./_delete_account.module.scss";
import { currentUserAtom } from "@/store/userAtom";
import CheckBox from "@/pages/Register/components/CheckBox/CheckBox";
import Button from "@/components/atom/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { ErrorType } from "@/types/ErrorType";
import { authService } from "@/services/server/authService";
import toast from "react-hot-toast";
import useLogout from "@/hooks/mutate/useLogout";

export default function DeleteAccount() {
  const [currentUser] = useAtom(currentUserAtom);
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);
  const [agreement, setAgreement] = useState<{ checked: boolean }>({
    checked: false,
  });
  const { logout } = useLogout();

  useEffect(() => {
    setMyPageTitle("회원 탈퇴");
    return () => setMyPageTitle("마이페이지");
  }, []);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAgreement({ checked: checked });
  };
  const { mutate: withdrawMember } = useMutation<void, ErrorType, void>({
    mutationFn: () => authService.withdrawMember(),
    onSuccess: () => {
      toast.success("탈퇴가 완료되었습니다.");
      // TODO 테스트 필요
      logout();
    },
  });

  const handleDeleteAccount = () => {
    withdrawMember();
  };

  return (
    <section className={styles["container"]}>
      <h2 className={styles["sr-only"]}>회원탈퇴</h2>
      <p className={styles["email"]}>{currentUser?.email}</p>
      <p className={styles["warning"]}>
        탈퇴 시 퀴즈 및 스터디 히스토리가 삭제되며 모든 데이터는 복구가
        불가능합니다.
      </p>
      <p className={styles["direction"]}>
        아래 사항을 확인하신 후에 탈퇴를 진행해주세요.
      </p>

      <ul className={styles["delete-account-agree-content"]}>
        <li>
          탈퇴 시, 내가 만든 퀴즈는 삭제되지 않습니다. 퀴즈 삭제를 원할 경우
          마이페이지에서 퀴즈 삭제 후 탈퇴 절차를 진행해 주세요.
        </li>
        <li>
          탈퇴 시, 내가 관리 중인 스터디의 스터디장 권한은 다른 스터디원에게
          자동으로 위임됩니다.
        </li>
        <li>
          타 회원의 퀴즈에 남긴 후기는 삭제되지 않으니 미리 확인해 주세요.
        </li>
        <li>탈퇴 시, 동일 이메일 계정의 재가입이 불가능 합니다.</li>
      </ul>
      <div className={styles["checkbox-area"]}>
        <CheckBox
          id="delete-account-checkbox"
          checked={agreement.checked}
          onChange={handleCheck}
          LabelComponent={
            <p className={styles["checkbox-label"]}>
              상기 정보를 모두 확인하였으며, 탈퇴에 동의합니다.
            </p>
          }
          required
          isOutLined
        />
      </div>
      <Button
        disabled={!agreement.checked}
        size="medium"
        color="primary"
        onClick={handleDeleteAccount}
      >
        계정 삭제하기
      </Button>
    </section>
  );
}
