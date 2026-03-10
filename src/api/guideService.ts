import api from "./api";

export const getGuides = async () => {
  const response = await api.get("guia/");
  return response.data;
};

export const createGuide = async (guideData: any) => {
  const response = await api.post("guia/", guideData);
  return response.data;
};
