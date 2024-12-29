export interface SectionNavType {
  title: string;
  link: string;
  order: number;
  subTitles?: SectionNavType[];
}
