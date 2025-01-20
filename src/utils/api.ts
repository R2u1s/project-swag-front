import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./constants";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class APIController {
  private sessionToken: string | undefined;
  private reqInstance: AxiosInstance = axios.create();

  constructor() {
    this.reqInstance = axios.create({
      baseURL: BASE_URL
    });
  }

  getInstance(): AxiosInstance {
    return this.reqInstance;
  }


}

export const api = new APIController();