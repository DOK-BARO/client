import { useState, useEffect, useRef, useLayoutEffect } from "react";

const useTextOverlap = () => {
  const textRef1 = useRef<HTMLDivElement | null>(null);
  const textRef2 = useRef<HTMLDivElement | null>(null);
  const [isOverlapping, setIsOverlapping] = useState(false);

  const checkOverlap = () => {
    if (textRef1.current && textRef2.current) {
      const rect1 = textRef1.current.getBoundingClientRect();
      const rect2 = textRef2.current.getBoundingClientRect();

      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
    return false;
  };

  useLayoutEffect(() => {
    const initialCheck = setTimeout(() => {
      setIsOverlapping(checkOverlap());
    }, 50);

    return () => clearTimeout(initialCheck);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const debouncedCheckOverlap = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsOverlapping(checkOverlap());
      }, 100);
    };

    window.addEventListener("resize", debouncedCheckOverlap);

    return () => {
      window.removeEventListener("resize", debouncedCheckOverlap);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isOverlapping, textRef1, textRef2 };
};

export default useTextOverlap;
