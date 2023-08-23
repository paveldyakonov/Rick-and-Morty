import { Locations } from "@/types/location";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

type queryParams = {
  page: number;
  name: string;
};

export const getLocationsRouterParams = (query: ParsedUrlQuery): queryParams => {
  let forcePage: string | string[] = query.page || "1";
  let name: string | string[] = query.name || "";

  if (typeof forcePage !== "string") {
    forcePage = forcePage[0];
  }
  if (typeof name !== "string") {
    name = name[0];
  }

  const params: queryParams = {
    page: parseInt(forcePage),
    name: name,
  };

  return params;
};

export const getLocations = async (endpoint: string, params: queryParams) => {
  try {
    const result = await axios<Locations>({
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
