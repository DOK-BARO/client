import { useEffect } from "react";

const useOutsideClick = (
  insideRefs: React.RefObject<HTMLElement>[],
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (insideRefs.some((ref) => ref.current?.contains(e.target as Node))) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};
export default useOutsideClick;
