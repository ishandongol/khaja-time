import { asyncFunction } from "./axios";

export const predictImage = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return asyncFunction({
    method: "POST",
    url: "/predict",
    data,
  });
};
