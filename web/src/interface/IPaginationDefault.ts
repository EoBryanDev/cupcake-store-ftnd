interface IPaginationDefault {
  offset: number
  limit: number
  order: 'asc' | 'desc'
  orderBy: 'name' | 'createdAt'
  currentPage: number
  searchType: 'most-popular' | 'newest' | 'default'
}

export type { IPaginationDefault }
