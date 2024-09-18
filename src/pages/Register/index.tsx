import { useParams } from "react-router-dom";
import SocialRegisterLayout from "./layout/socialRegisterLayout";
import EmailRegisterLayout from "./layout/emailRegisterLayout";

export default function Index() {
  const { method } = useParams();

  switch (method) {
    case "social":
      return <SocialRegisterLayout />;
    default:
      return <EmailRegisterLayout />;
  }
}
