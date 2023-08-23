import { Episodes } from "@/types/episode";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

type queryParams = {
  page: number;
  name: string;
  episode: string;
};

export const getEpisodesRouterParams = (query: ParsedUrlQuery): queryParams => {
  let forcePage: string | string[] = query.page || "1";
  let name: string | string[] = query.name || "";
  let episode: string | string[] = query.season || "0";

  if (typeof forcePage !== "string") {
    forcePage = forcePage[0];
  }
  if (typeof name !== "string") {
    name = name[0];
  }
  if (typeof episode !== "string") {
    episode = episode[0];
  }

  const params: queryParams = {
    page: parseInt(forcePage),
    name: name,
    episode: episode == "0" ? "" : `s0${parseInt(episode)}`,
  };

  return params;
};

export const getEpisodes = async (endpoint: string, params: queryParams) => {
  try {
    const result = await axios<Episodes>({
      method: "GET",
      url: endpoint,
      params: params,
    });
    const data = result.data;
    return data;
  } catch (error) {
    return null;
  }
};
