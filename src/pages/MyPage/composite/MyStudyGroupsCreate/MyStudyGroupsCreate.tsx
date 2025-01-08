import { useEffect } from "react";
import { myPageTitleAtom } from "@/store/myPageAtom";
import { useAtom } from "jotai";
export default function MyStudyGroupsCreate() {
  const [, setMyPageTitle] = useAtom(myPageTitleAtom);

  useEffect(() => {
    setMyPageTitle("스터디 그룹 만들기");
    return () => setMyPageTitle("마이페이지");
  }, []);
  return <div>MyStudyGroupsCreate</div>;
}
