import { asyncFunction } from "./axios";

export interface PredictResponse {
  label: string;
}
export const predictImage = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return asyncFunction<PredictResponse>({
    method: "POST",
    url: "/predict",
    data,
  });
};
