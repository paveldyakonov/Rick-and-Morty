type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type Episodes = {
  info: Info;
  results: Episode[];
};
