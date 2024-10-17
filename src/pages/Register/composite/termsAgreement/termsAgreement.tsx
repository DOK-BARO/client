import React, { FormEvent, useState } from "react";
import styles from "./_terms_agreement.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/atom/button/button";
import CheckBox from "@/pages/Register/components/checkBox/checkBox";
import { useQuery } from "@tanstack/react-query";
import { termsAgreementKeys } from "@/data/queryKeys.ts";
import { getTermsOfServices } from "@/services/server/authService.ts";
import { TermsAgreementItem } from "@/pages/Register/composite/termsAgreement/termsAgreementItem.tsx";

interface Agreements {
  allAgree: boolean;
  termsAgree: boolean;
  privacyAgree: boolean;
  emailNews: boolean;
  adsEmail: boolean;
}
export default function TermsAgreement() {
  const { isLoading, data:termsArgeement } = useQuery({
    queryKey: termsAgreementKeys.termsAgreement(),
    queryFn: getTermsOfServices,
  });
  const { method } = useParams();

  const [agreements, setAgreements] = useState<Agreements>({
    allAgree: false,
    termsAgree: false,
    privacyAgree: false,
    emailNews: false,
    adsEmail: false,
  });

  const onAllAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAgreements({
      allAgree: isChecked,
      termsAgree: isChecked,
      privacyAgree: isChecked,
      emailNews: isChecked,
      adsEmail: isChecked,
    });
  };

  const onSingleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    console.log("onSingleAgreeChange", id, checked);
    setAgreements((prev) => ({
      ...prev,
      [id]: checked,
      allAgree:
        prev.termsAgree &&
        prev.privacyAgree &&
        prev.emailNews &&
        prev.adsEmail &&
        checked,
    }));
  };

  const isSubmitAble: boolean =
    agreements.termsAgree && agreements.privacyAgree;

  const navigate = useNavigate();
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("동의하고 가입하기");
    navigate(`/register/${method}/2`);
  };

  // TODO : 리펙토링 필요
  if(isLoading){
    return <div>로딩중...</div>;
  }
  return (
    <section className={styles["terms-agreement"]}>
      <h3>서비스 이용약관 동의</h3>
      <p className={styles["description"]}>
        DOKBARO의 서비스 이용약관에
        <br />
        동의해 주세요.
      </p>
      <form onSubmit={onSubmit}>
        {/* 모두 동의 */}
        <div className={styles["agreement-all"]}>
          <CheckBox
            id="allAgree"
            label={"모두 동의 (선택 정보 포함)"}
            checked={agreements.allAgree}
            onChange={onAllAgreeChange}
            isOutLined={true}
          />
        </div>
        <div className={styles["agreement-list-container"]}>
          {/* 필수 약관 */}
          <fieldset>
            <legend>필수 약관</legend>
            {termsArgeement?.filter((term) => term.primary)
              .map((primaryTerm) => (
                <TermsAgreementItem  
                  id={primaryTerm.id}
                  checkBoxId={Object.keys(agreements)[primaryTerm.id]}
                  label={`[필수] ${primaryTerm.title}`}
                  checked ={agreements[Object.keys(agreements)[primaryTerm.id] as keyof Agreements]}
                  onChange={onSingleAgreeChange}
                  subTitle={primaryTerm.subTitle}
                  hasDetail={primaryTerm.hasDetail}
                />
              ))}
          </fieldset>

          {/* 선택 약관 */}
          <fieldset>
            <legend>선택 약관</legend>
            {termsArgeement?.filter((term) => !term.primary)
              .map((primaryTerm) => (
                <TermsAgreementItem
                  id={primaryTerm.id}
                  checkBoxId={Object.keys(agreements)[primaryTerm.id]}
                  label={`[선택] ${primaryTerm.title}`}
                  checked ={agreements[Object.keys(agreements)[primaryTerm.id] as keyof Agreements]}
                  onChange={onSingleAgreeChange}
                  subTitle={primaryTerm.subTitle}
                  hasDetail={primaryTerm.hasDetail}
                />
              ))}
          </fieldset>
        </div>
        <Button
          type="submit"
          className={styles[isSubmitAble ? "submit" : "submit-disabled"]}
          disabled={!isSubmitAble}
        >
          동의하고 가입하기
        </Button>
      </form>
    </section>
  );
}
