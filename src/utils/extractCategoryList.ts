import { ListItem } from "@/components/composite/Breadcrumb/Breadcrumb";
import { BookCategories } from "@/types/BookDetailType";

export const extractCategoryList = (
  data: BookCategories,
  list: ListItem[] = []
): ListItem[] => {
  if (data) {
    list.unshift({ id: Number(data.id), name: data.name });
    if (data.parent) {
      return extractCategoryList(data.parent, list);
    }
  }
  return list;
};
