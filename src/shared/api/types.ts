export type PageInfo = {
  total: number
  pageNumber: number
  pageSize: number
}

export type PaginationResp<T> = {
  pageInfo: PageInfo
  data: T[]
}

export type PaginationReq = {
  page: number
  size: number
}

export type ASPPaginationResp<T> = {
  items: T[]
  paginationInfo: {
    currentPage: number
    totalPages: number
    pageSize: number
  }
}
