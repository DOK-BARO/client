import { useEffect } from "react";
import { myPageTitleAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";
export default function MyStudyGroupsJoin() {
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);

  useEffect(() => {
    setMyPageTitle("코드로 가입하기");
    return () => setMyPageTitle("마이페이지");
  }, []);
  return <div>MyStudyGroupsJoin</div>;
}
