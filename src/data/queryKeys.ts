export const bookKeys = {
  detail: (id: string) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
};
