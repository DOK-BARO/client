import { useParams } from "react-router-dom";
import EmailRegisterLayout from "./layout/EmailRegisterLayout";
import SocialRegisterLayout from "./layout/SocialRegisterLayout";

export default function Index() {
  const { method } = useParams();

  switch (method) {
    case "email":
      return <EmailRegisterLayout />;
    case "google":
    case "github":
    case "naver":
    case "kakao":
      return <SocialRegisterLayout />;
    default:
      return <div>404</div>;
  }
}
