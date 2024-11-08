import React, { FormEvent, useEffect, useState } from "react";
import styles from "./_terms_agreement.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/atom/button/button";
import CheckBox from "@/pages/Register/components/checkBox/checkBox";
import { APP_NAME } from "@/data/constants.ts";
import { getTermsOfService } from "@/services/server/authService";
import { TermsOfServiceType } from "@/types/TermsOfServiceType";

export default function TermsAgreement() {
  // agreement
  const { method } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState<TermsOfServiceType[] | undefined>(
    undefined
  );

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
    console.log(services);
  }, [services]);

  const [agreements, setAgreements] = useState({
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

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("동의하고 가입하기");
    navigate(`/register/${method}/2`);
  };

  // TODO : 리펙토링 필요
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
            checked={agreements.allAgree}
            onChange={onAllAgreeChange}
            isOutLined={true}
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
                  <label
                    htmlFor={`termsAgree-${service.id}`}
                    className={styles.label}
                  >
                    <CheckBox
                      id={`termsAgree-${service.id}`}
                      checked={agreements.termsAgree}
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
