export interface IPagination {
  limit?: number;
  order?: string;
  offset?: number;
  page?: number;
  total?: number;
  filter?: IFilter;
}

export interface IFilter {
  filterText?: any;
  properties?: string[];
}
