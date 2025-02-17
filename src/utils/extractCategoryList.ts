import { ListItemType } from "@/components/composite/Breadcrumb/Breadcrumb";
import { BookCategoriesType } from "@/types/BookDetailType";

export const extractCategoryList = (
  data: BookCategoriesType,
  list: ListItemType[] = [],
): ListItemType[] => {
  if (data.parent) {
    list.unshift({ id: Number(data.id), name: data.name });
    return extractCategoryList(data.parent, list);
  }
  return list;
};
