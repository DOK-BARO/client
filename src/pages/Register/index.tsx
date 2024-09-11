import RegisterLayout from "./layout/registerLayout";
import TermsAgreement from "./composite/termsAgreement";

export default function Index() {
  return (
    <RegisterLayout>
      <TermsAgreement />
    </RegisterLayout>
  );
}
