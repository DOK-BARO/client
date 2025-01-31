// 부모 요소까지 data-no-dnd="true" 속성 검사
export const hasNoDndAttribute = (element: HTMLElement | null): boolean => {
  while (element) {
    if (element.dataset?.noDnd === "true") {
      return true;
    }
    element = element.parentElement;
  }
  return false;
};

// 부모 요소까지 data-allow-dnd="true" 속성 검사
export const hasAllowDndAttribute = (element: HTMLElement | null): boolean => {
  while (element) {
    if (element.dataset?.allowDnd === "true") {
      return true;
    }
    element = element.parentElement;
  }
  return false;
};

export const isInteractiveElement = (element: HTMLElement | null): boolean => {
  const interactiveTags: string[] = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
  ];
  while (element) {
    if (interactiveTags.includes(element.tagName.toLowerCase())) {
      return true;
    }
    element = element.parentElement;
  }
  return false;
};
