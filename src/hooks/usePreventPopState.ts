import { useEffect } from "react";
// 뒤로가기 감지
const usePreventPopState = (popStateCallBack: () => void) => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      popStateCallBack();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};
export default usePreventPopState;
