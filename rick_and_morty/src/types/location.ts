type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export type Locations = {
  info: Info;
  results: Location[];
};
