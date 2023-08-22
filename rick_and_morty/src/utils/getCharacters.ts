import { filterValues, genderValues } from "@/config/filter";
import { Characters } from "@/types/character";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

type queryParams = {
  page: number;
  name: string;
  status: string;
  gender: string;
};

export const getRouterParams = (query: ParsedUrlQuery): queryParams => {
  let forcePage: string | string[] = query.page || "1";
  let characterName: string | string[] = query.name || "";
  let status: string | string[] = query.status || "0";
  let gender: string | string[] = query.gender || "0";

  if (typeof forcePage !== "string") {
    forcePage = forcePage[0];
  }
  if (typeof characterName !== "string") {
    characterName = characterName[0];
  }
  if (typeof status !== "string") {
    status = status[0];
  }
  if (typeof gender !== "string") {
    gender = gender[0];
  }

  if (parseInt(status) >= filterValues.length) {
    status = "0";
  }
  if (parseInt(gender) >= genderValues.length) {
    gender = "0";
  }

  const params: queryParams = {
    page: parseInt(forcePage),
    name: characterName,
    status: status === "0" ? "" : filterValues[parseInt(status)],
    gender: gender === "0" ? "" : genderValues[parseInt(gender)],
  };

  return params;
};

export const getCharacters = async (endpoint: string, params: queryParams) => {
  try {
    const result = await axios<Characters>({
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
