import { useParams } from "react-router-dom";
import EmailRegisterLayout from "./layout/emailRegisterLayout";
import SocialRegisterLayout from "./layout/socialRegisterLayout";

export default function Index() {
  const { method } = useParams();

  switch (method) {
    case "email":
      return <EmailRegisterLayout />;
    default:
      return <SocialRegisterLayout />;
  }
}
