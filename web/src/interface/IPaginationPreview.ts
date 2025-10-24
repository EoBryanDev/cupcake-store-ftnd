interface IProductPreviewPagination {
  searchType: 'most-popular' | 'newest' | 'default';
  order: 'asc' | 'desc';
  orderBy: 'createdAt' | 'name';

}

export type { IProductPreviewPagination }