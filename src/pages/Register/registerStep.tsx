import { useOutletContext, useParams } from "react-router-dom";
import TermsAgreement from "@/pages/Register/composite/social/termsAgreement/termsAgreement.tsx";
import ProfileSet from "@/pages/Register/composite/profileSet/profileSet.tsx";
import PasswordSet from "@/pages/Register/composite/email/passwordSet/passwordSet.tsx";
import Verification from "./composite/email/verification/verification";

type Method = "social" | "email";
type Step = "1" | "2" | "3" | "4";

export default function RegisterStep() {
  const { step } = useParams<{ step: Step }>();
  const method = useOutletContext<Method>();

  const components: Record<
    Method,
    Partial<Record<Step, React.ComponentType>>
  > = {
    social: {
      "1": TermsAgreement,
      "2": ProfileSet,
    },
    email: {
      "1": TermsAgreement,
      "2": Verification,
      "3": PasswordSet,
      "4": ProfileSet,
    },
  };

  const Component =
    components[method]?.[step!] ||
    (() => <div>페이지를 찾을 수 없습니다.</div>);

  return <Component />;
}
