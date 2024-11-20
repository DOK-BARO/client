import { useEffect, useState } from "react";

const useGNB = () => {
  const [isGNBHidden, setIsGNBHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // 아래로 스크롤
        setIsGNBHidden(true);
      } else {
        // 위로 스크롤
        setIsGNBHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return { isGNBHidden };
};

export default useGNB;
