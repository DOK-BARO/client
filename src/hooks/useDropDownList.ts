import React, { useEffect, useRef, useState } from "react";

export function useDropDownList () {
  const [isOpenDropDownList, setIsOpenDropDownList] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  // dropdown list를 감싸는 div 참조용
  const dropDownListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      const { target } = e;
      if (isOpenDropDownList && dropDownListRef.current && !dropDownListRef.current.contains(target as Node)) {
        setIsOpenDropDownList(false);
      }
    };
    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, [isOpenDropDownList]);

  const openDropDownList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpenDropDownList(!isOpenDropDownList);
  };

  const closeDropDownList = () => {
    setIsOpenDropDownList(false);
  };

  return { isOpenDropDownList,anchorEl, openDropDownList,closeDropDownList, dropDownListRef };
}