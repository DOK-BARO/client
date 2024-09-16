import RegisterLayout from "./layout/registerLayout";
import TermsAgreement from "./composite/termsAgreement";
import ProfileSet from "./composite/profileSet";
export default function Index() {
  return (
    <RegisterLayout>
      <TermsAgreement />
      {/* <ProfileSet /> */}
    </RegisterLayout>
  );
}
