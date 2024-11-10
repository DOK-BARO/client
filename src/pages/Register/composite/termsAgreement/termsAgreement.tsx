import React, { FormEvent, useEffect, useState } from "react";
import styles from "./_terms_agreement.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/atom/button/button";
import CheckBox from "@/pages/Register/components/checkBox/checkBox";
import { APP_NAME } from "@/data/constants.ts";
import useModal from "@/hooks/useModal";
import TermsModal from "@/components/atom/TermsModal/termsModal";
import { useGetTermDetail } from "@/hooks/useGetTermDetail";
import { useGetTerms } from "@/hooks/useGetTerms";
import { sendTermsAgreement } from "@/services/server/authService";
import { RegisterInfoAtom } from "@/store/userAtom";
import { RegisterInfoType } from "@/types/UserType";
import { useAtom } from "jotai";

export default function TermsAgreement() {
  const { method } = useParams();
  const navigate = useNavigate();
  const nextPage = `/register/${method}/2`;

  const { isModalOpen, openModal, closeModal } = useModal();
  const [registrationInfo, setRegistrationInfo] =
    useAtom<RegisterInfoType>(RegisterInfoAtom);

  const [agreements, setAgreements] = useState<
    Record<string, { checked: boolean; isRequired: boolean }>
  >({
    allAgree: { checked: false, isRequired: false },
  });

  // 이용약관 '보기' 클릭 시 상세 불러오기
  const {
    getTermDetail,
    termDetail,
    isLoading: isTermDetailLoading,
  } = useGetTermDetail();

  // 이용약관들을 불러오기
  const { terms, isLoading: isTermsLoading } = useGetTerms();
  const [modalTitle, setModalTitle] = useState<string>("");

  useEffect(() => {
    if (terms && terms.length > 0) {
      const serviceAgreementObject = terms.reduce((acc, service) => {
        acc[service.title] = { checked: false, isRequired: service.primary };
        return acc;
      }, {} as Record<string, { checked: boolean; isRequired: boolean }>);
      setAgreements({
        ...serviceAgreementObject,
        allAgree: { checked: false, isRequired: false },
      });
    }
  }, [terms]);

  // 모두 동의
  const handleAllAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setAgreements((prev) => {
      const updatedAgreements = Object.keys(prev).reduce((acc, key) => {
        acc[key] = { ...prev[key], checked };
        return acc;
      }, {} as Record<string, { checked: boolean; isRequired: boolean }>);

      return {
        ...updatedAgreements,
        allAgree: { checked, isRequired: true },
      };
    });
  };

  // 개별 동의
  const handleSingleAgreeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, checked } = event.target;

    setAgreements((prev) => {
      const updatedAgreements = {
        ...prev,
        [id]: { ...prev[id], checked },
      };

      const allAgree = Object.values(updatedAgreements)
        .filter((value) => value.isRequired) // 필수 동의 항목만 체크
        .every((value) => value.checked);

      return {
        ...updatedAgreements,
        allAgree: {
          checked: allAgree,
          isRequired: false,
        },
      };
    });
  };

  const handleTermsContentShowButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { value } = e.target as HTMLButtonElement;
    const index = Number(value);
    getTermDetail(index);
    if (terms) {
      const selectedTerm = terms.find((term) => term.id === index)?.title;
      if (selectedTerm) {
        setModalTitle(selectedTerm.slice(0, -3));
      }
    }
    openModal();
  };

  // 필수 항목에 동의했을 때
  const isSubmitAble: boolean = Object.values(agreements).every(
    (agreement) => agreement.checked || !agreement.isRequired
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const itemsWithLastItem = Object.keys(agreements)
      .filter((key) => agreements[key].checked)
      .map((key) => Object.keys(agreements).indexOf(key));

    const items = itemsWithLastItem.slice(0, itemsWithLastItem.length - 1);

    if (method === "email") {
      // 이용약관 동의 상태 전역에 저장
      setRegistrationInfo({
        ...registrationInfo,
        termsAgreements: items,
      });
    } else {
      // 이용약관 동의
      await sendTermsAgreement(items);
    }
    navigate(nextPage);
  };

  return (
    <section className={styles["terms-agreement"]}>
      <h3>서비스 이용약관 동의</h3>
      <p className={styles["description"]}>
        {APP_NAME}의 서비스 이용약관에
        <br />
        동의해 주세요.
      </p>
      <form onSubmit={handleSubmit}>
        {/* 모두 동의 */}
        <div className={styles["terms-agreement-all"]}>
          <CheckBox
            id="allAgree"
            LabelComponent={
              <p className={styles["terms-agreement-all-label"]}>
                모두 동의 (선택 정보 포함)
              </p>
            }
            checked={agreements.allAgree.checked}
            onChange={handleAllAgreeChange}
            isOutLined
          />
        </div>
        <div className={styles.line} />
        <div className={styles["terms-agreement-item-container"]}>
          {/* 필수 약관 */}
          {!isTermsLoading &&
            terms &&
            terms.map((service, index) => (
              <fieldset
                key={index}
                className={styles["terms-agreement-item-fieldset"]}
              >
                <legend>{service.primary ? "필수 약관" : "선택 약관"}</legend>
                <span className={styles["checkbox-label-button-container"]}>
                  <label htmlFor={service.title} className={styles.label}>
                    <CheckBox
                      id={service.title}
                      checked={agreements[service.title]?.checked || false}
                      onChange={handleSingleAgreeChange}
                      isOutLined={false}
                      required={service.primary}
                      LabelComponent={
                        <>
                          [{service.primary ? "필수" : "선택"}] {service.title}
                        </>
                      }
                    />
                  </label>
                  {service.hasDetail ? (
                    <Button
                      className={styles["terms-agreement-content-show-button"]}
                      onClick={handleTermsContentShowButton}
                      value={service.id.toString()}
                    >
                      보기
                    </Button>
                  ) : null}
                </span>
                {service.subTitle ? (
                  <p className={styles["terms-agreement-subTitle"]}>
                    {service.subTitle}
                  </p>
                ) : null}
              </fieldset>
            ))}
        </div>
        <Button
          type="submit"
          disabled={!isSubmitAble}
          fullWidth
          color="primary"
        >
          동의하고 가입하기
        </Button>
      </form>
      {isModalOpen && termDetail && !isTermDetailLoading ? (
        <TermsModal
          title={modalTitle}
          closeModal={closeModal}
          content={termDetail}
        />
      ) : null}
    </section>
  );
}
