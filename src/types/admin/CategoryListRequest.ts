type CategoryListRequest = {
  page: number;
  perPage: number;
  search: string;
  orderBy: string;
  ascend: boolean;
};

export default CategoryListRequest;
