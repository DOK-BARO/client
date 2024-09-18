import { useOutletContext, useParams } from "react-router-dom";
import TermsAgreement from "./composite/social/termsAgreement";
import ProfileSet from "./composite/profileSet";
import EmailVerification from "./composite/email/emailVerification";
import PasswordSet from "./composite/email/passwordSet";

type Method = "social" | "email";
type Step = "1" | "2";

export default function RegisterStep() {
  const { step } = useParams<{ step: Step }>();
  const method = useOutletContext<Method>();

  const components: Record<Method, Record<Step, React.ComponentType>> = {
    social: {
      "1": TermsAgreement,
      "2": ProfileSet,
    },
    email: {
      "1": EmailVerification,
      "2": PasswordSet,
    },
  };

  const Component = components[method]?.[step!];

  return <Component />;
}
