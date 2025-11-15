interface IProductFiltersCategory {
  data: {
    colors: Array<string>
    sizes: Array<string>
    price: {
      min: number
      max: number
    }
  }
}

export type { IProductFiltersCategory }