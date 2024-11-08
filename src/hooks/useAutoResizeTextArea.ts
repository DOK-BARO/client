import { useEffect, useRef } from "react";
import useTextarea from "./useTextarea";

function useAutoResizeTextarea(initialValue = "") {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { value, onChange } = useTextarea(initialValue);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // 초기 높이를 auto로 설정
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 따라 높이 조절
        }
    }, [value]); // value가 변경될 때마다 실행

    return { value, onChange, textareaRef };
}

export default useAutoResizeTextarea;
