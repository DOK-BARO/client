import React, { FormEvent, useEffect, useState } from "react";
import styles from "./_terms_agreement.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/atom/button/button";
import CheckBox from "@/pages/Register/components/checkBox/checkBox";
import { APP_NAME } from "@/data/constants.ts";
import { getTermsOfService } from "@/services/server/authService";
import { TermsOfServiceType } from "@/types/TermsOfServiceType";

export default function TermsAgreement() {
  const { method } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState<TermsOfServiceType[] | undefined>(
    undefined
  );
  const [agreements, setAgreements] = useState<
    Record<string, { checked: boolean; isRequired: boolean }>
  >({
    allAgree: { checked: false, isRequired: false },
  });

  // 이용 약관을 불러와 service에 저장하는 로직
  const fetchTermsOfService = async () => {
    const response = await getTermsOfService();
    if (response) {
      setServices(response);
    }
  };
  useEffect(() => {
    fetchTermsOfService();
  }, []);

  useEffect(() => {
    if (services && services.length > 0) {
      const serviceAgreementObject = services.reduce((acc, service) => {
        acc[service.title] = { checked: false, isRequired: service.primary };
        return acc;
      }, {} as Record<string, { checked: boolean; isRequired: boolean }>);
      setAgreements({
        ...serviceAgreementObject,
        allAgree: { checked: false, isRequired: false },
      });
    }
  }, [services]);

  // 모두 동의
  const onAllAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const onSingleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // 필수 항목에 동의했을 때
  const isSubmitAble: boolean = Object.values(agreements).every(
    (agreement) => agreement.checked || !agreement.isRequired
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate(`/register/${method}/2`);
  };

  return (
    <section className={styles["terms-agreement"]}>
      <h3>서비스 이용약관 동의</h3>
      <p className={styles["description"]}>
        {APP_NAME}의 서비스 이용약관에
        <br />
        동의해 주세요.
      </p>
      <form onSubmit={onSubmit}>
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
            onChange={onAllAgreeChange}
            isOutLined
          />
        </div>
        <div className={styles.line} />
        <div className={styles["terms-agreement-item-container"]}>
          {/* 필수 약관 */}
          {services &&
            services.map((service, index) => (
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
                      onChange={onSingleAgreeChange}
                      isOutLined={false}
                      required={service.primary}
                      LabelComponent={
                        <>
                          [{service.primary ? "필수" : "선택"}] {service.title}
                        </>
                      }
                    />
                  </label>
                  <Button
                    className={styles["terms-agreement-content-show-button"]}
                  >
                    보기
                  </Button>
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
    </section>
  );
}
