import { useState } from "react";

const useCodeInput = () => {
  const [codeList, setCodeList] = useState<string[]>(Array(6).fill(""));
  const combinedCode: string = codeList.join("");

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let { value } = e.target;
    value = value.toUpperCase();
    const newCodeList = [...codeList];

    if (value.length > 1) {
      // 현재 칸과 다음 칸을 채움
      newCodeList[index] = value[0];
      if (index + 1 < newCodeList.length) {
        newCodeList[index + 1] = value[1];
      }
    } else {
      newCodeList[index] = value;
    }

    setCodeList(newCodeList);

    // 다음 칸으로 포커스 이동
    if (value.length === 1 && index < 5) {
      setTimeout(() => {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      const newCodeList = [...codeList];

      if (newCodeList[index] === "") {
        // 현재 칸이 비어있으면 이전 칸도 같이 삭제
        if (index > 0) {
          newCodeList[index - 1] = "";
          setCodeList(newCodeList);

          setTimeout(() => {
            const prevInput = document.getElementById(
              `code-input-${index - 1}`,
            );
            if (prevInput) {
              (prevInput as HTMLInputElement).focus();
            }
          }, 0);
        }
      } else {
        // 현재 칸만 삭제
        newCodeList[index] = "";
        setCodeList(newCodeList);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteCode = e.clipboardData.getData("text").toUpperCase();
    const newCodeList = [...codeList];

    const pasteArr = pasteCode.slice(0, 6).split("");
    pasteArr.forEach((char, i) => {
      newCodeList[i] = char;
    });

    setCodeList(newCodeList);

    setTimeout(() => {
      const nextInput = document.getElementById(
        `code-input-${pasteArr.length - 1}`,
      );
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }, 0);

    // 기본 붙여넣기 동작 방지
    e.preventDefault();
  };

  return {
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    combinedCode,
    codeList,
  };
};
export default useCodeInput;
