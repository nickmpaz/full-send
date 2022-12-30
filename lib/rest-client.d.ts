import { RequestInfo, RequestInit, Response } from "node-fetch";
import { Request } from "./definitions/types";
declare class RestClient {
  requests: Record<string, Request>;
  result?: string;
  request(name: string, func: () => void): void;
  Fetch(url: RequestInfo, init?: RequestInit | undefined): Promise<Response>;
  run(): Promise<void>;
  selectRequest(): Promise<Request>;
  sendRequest(request: Request): Promise<void>;
  selectNextAction(request: Request): Promise<void>;
}
declare const restClient: RestClient;
declare const request: (name: string, func: () => void) => void;
declare const Fetch: (
  url: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response>;
export { restClient, request, Fetch };
