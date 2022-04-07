import { asyncFunction } from "./axios";

export const helloServer = () => asyncFunction({ method: "GET", url: "/" });
