import { useEffect, useState } from "react";

const useGNB = () => {
  const [isGNBHidden, setIsGNBHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const scrollThreshold = 80; // GNB를 숨기기 위한 스크롤 임계값
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          // 아래로 스크롤
          setIsGNBHidden(true);
        } else {
          // 위로 스크롤
          setIsGNBHidden(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return { isGNBHidden };
};

export default useGNB;
