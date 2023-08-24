export enum Status {
  dead = "Dead",
  alive = "Alive",
  unknown = "unknown",
}

type Location = {
  name: string;
  url: string;
};

type Origin = {
  name: string;
  url: string;
};

type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Characters = {
  info: Info;
  results: Character[];
};
