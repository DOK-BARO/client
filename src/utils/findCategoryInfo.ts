import { BookCategoryType } from "@/types/BookCategoryType";

// 가장 상위의 부모 카테고리 아이디를 찾음
export const findTopParentCategoryInfo = (
  categories: BookCategoryType[],
  targetId: number,
): { id: number; name: string } | null => {
  const traverse = (
    items: BookCategoryType[],
    parent: { id: number; name: string } | null,
  ): { id: number; name: string } | null => {
    for (const item of items) {
      // 'parent'가 targetId로 일치하는지 체크
      if (item.id === targetId) {
        return parent === null ? { id: item.id, name: item.name } : parent; // parent가 null이면 자기 자신 반환
      }

      // 자식 요소가 있을 경우 재귀적으로 탐색
      if (item.details && item.details.length > 0) {
        const result = traverse(
          item.details,
          parent === null ? { id: item.id, name: item.name } : parent,
        );

        if (result !== null) {
          return result;
        }
      }
    }
    return null; // 찾지 못하면 null 반환
  };

  return traverse(categories, null);
};

// 한 단계 상위의 부모 카테고리 아이디를 찾음
export const findParentCategoryInfo = (
  categories: BookCategoryType[],
  targetId: number,
): { id: number; name: string } | null => {
  const traverse = (
    items: BookCategoryType[],
  ): { id: number; name: string } | null => {
    for (const item of items) {
      // 현재 아이템의 자식에서 targetId를 찾으면 현재 아이템의 id와 name 반환
      if (item.details && item.details.some((child) => child.id === targetId)) {
        return { id: item.id, name: item.name };
      }

      // 자식 요소가 있을 경우 재귀적으로 탐색
      if (item.details && item.details.length > 0) {
        const result = traverse(item.details);
        if (result !== null) {
          return result;
        }
      }
    }
    return null; // 찾지 못하면 null 반환
  };

  return traverse(categories);
};

// 본인의 Id와 name 반환
export const findCurrentCategoryInfo = (
  categories: BookCategoryType[],
  targetId: number,
): { id: number; name: string } | null => {
  const traverse = (
    items: BookCategoryType[],
  ): { id: number; name: string } | null => {
    for (const item of items) {
      // targetId와 일치하는 항목을 찾으면 id와 name 반환
      if (item.id === targetId) {
        return { id: item.id, name: item.name };
      }

      // 자식 요소가 있을 경우 재귀적으로 탐색
      if (item.details && item.details.length > 0) {
        const result = traverse(item.details);
        if (result !== null) {
          return result;
        }
      }
    }
    return null; // 찾지 못하면 null 반환
  };

  return traverse(categories);
};
