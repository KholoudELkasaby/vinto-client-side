export interface Category {
  _id: string;
  title: string;
  img: string;
}
export interface CategoryResponse {
  categories: Category[];
}
