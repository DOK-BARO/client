import React from "react";
import styles from "./_terms.agreement_item.module.scss";
import CheckBox from "@/pages/Register/components/checkBox/checkBox.tsx";
import { getDetailTermsOfServices } from "@/services/server/authService.ts";

interface TermsAgreementItemProps {
  id: number;
  checkBoxId: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  subTitle?: string;
  hasDetail?: boolean;
  required : boolean;
}

export function TermsAgreementItem({
  id,
  checkBoxId,
  label,
  checked,
  onChange,
  subTitle,
  hasDetail,
  required,
}: TermsAgreementItemProps) {
  // const { isLoading, data:termDetail } = useQuery({
  //   queryKey: termsAgreementKeys.detailOfTermsAgreement(id),
  //   queryFn: () => getDetailTermsOfServices(id),
  // });
  //
  // if(isLoading){
  //   return <div>로딩중...</div>;
  // }

  return (
    <div
      className={styles["agreement-item-container"]}
    >
      <div className={styles["agreement-item-checkbox"]}>
        <CheckBox
          id={checkBoxId}
          label={label}
          checked={checked}
          onChange={onChange}
          isOutLined={false}
          required={required}
        />
        {subTitle && <p className={styles["agreement-item-subtitle"]}>
          {subTitle}
        </p>}
      </div>
      {hasDetail &&
        // TODO: onClick 시 modal 구현 필요
        <button
          type="button"
          className={styles["agreement-item-detail-show-button"]}
          onClick={async () =>  {
            console.log(`here clicked: ${id}`);
            const data = await getDetailTermsOfServices(id);
            console.log(data);
          }}
        >
          보기
        </button>}
    </div>
  );
}