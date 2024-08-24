// interface Topic {
//   title: string;
// }

// interface SubCategory {
//   title: string;
//   topics?: Topic[]; // topics는 선택적 필드이며, 배열로 정의
// }

export interface Category {
  id: number;
  name: string;
  details?: Category[];
}

export interface GNBProps {
  categories: Category[];
}
