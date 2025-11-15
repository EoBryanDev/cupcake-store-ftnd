import { IPaginationDefault } from "../interface/IPaginationDefault";

const paginationDefault = (): IPaginationDefault => {
  return {
    offset: 1,
    limit: 9,
    order: 'asc',
    orderBy: 'name',
    currentPage: 1,
    searchType: 'default'
  }

}

export { paginationDefault }