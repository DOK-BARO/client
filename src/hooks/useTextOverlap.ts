import { useState, useEffect, useRef } from "react";

const useTextOverlap = () => {
  const [isOverlapping, setIsOverlapping] = useState(false);
  const textRef1 = useRef<HTMLDivElement | null>(null);
  const textRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOverlap = () => {
      if (textRef1.current && textRef2.current) {
        const rect1 = textRef1.current.getBoundingClientRect();
        const rect2 = textRef2.current.getBoundingClientRect();

        const isOverlapping = !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );

        setIsOverlapping(isOverlapping);
      }
    };

    checkOverlap();

    window.addEventListener("resize", checkOverlap);

    return () => window.removeEventListener("resize", checkOverlap);
  }, []);

  return { isOverlapping, textRef1, textRef2 };
};

export default useTextOverlap;
