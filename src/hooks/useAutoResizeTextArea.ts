import { useEffect, useRef } from "react";
import useTextarea from "./useTextarea";

const useAutoResizeTextarea = (
  initialValue: string = "",
  minHeight: number = 48,
  borderWidth: number = 0,
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { value, onChange, resetTextarea } = useTextarea(initialValue);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minHeight}px`;
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + borderWidth
      }px`; // 내용에 따라 높이 조절. 3: border 굵기
    }
  }, [value, initialValue, textareaRef.current]);

  return { value, onChange, textareaRef, resetTextarea };
};

export default useAutoResizeTextarea;
