import glob from "glob";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import inquirer from "inquirer";
import { prettyStringify } from "./console";
import { Request } from "./definitions/types";
import { formatResponse, getHttpFiles } from "./utils";

class RestClient {
  requests: Record<string, Request> = {};
  result?: string;

  request(name: string, func: () => void) {
    this.requests[name] = { name, func };
  }

  async Fetch(
    url: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {
    const response = await fetch(url, init);
    const responseClone = response.clone();
    const body = prettyStringify(await response.text());
    const responsePretty = formatResponse(response, body);
    console.log(responsePretty);
    const responseRaw = formatResponse(response, body, true);
    this.result = responseRaw;
    return responseClone;
  }

  async run(): Promise<void> {
    const httpFiles = await getHttpFiles();
    for (const file of httpFiles) {
      await import(file);
    }
    const selectedRequest = await this.selectRequest();
    await this.sendRequest(selectedRequest);
    await this.selectNextAction(selectedRequest);
  }

  async selectRequest(): Promise<Request> {
    const selection = await inquirer.prompt({
      type: "list",
      name: "request",
      message: "Request",
      choices: Object.values(this.requests).map((request) => request.name),
    });
    const selectedRequest = this.requests[selection["request"]];
    return selectedRequest;
  }

  async sendRequest(request: Request): Promise<void> {
    await request.func();
  }

  async selectNextAction(request: Request) {
    const choices: Record<string, () => void | Promise<void>> = {
      Resend: async () => {
        await this.sendRequest(request);
        await this.selectNextAction(request);
      },
      "Inspect response in $EDITOR": async () => {
        await inquirer.prompt({
          type: "editor",
          name: "inspect",
          default: this.result,
        });
        await this.selectNextAction(request);
      },
      Quit: () => {},
    };
    const result = await inquirer.prompt({
      type: "list",
      name: "selection",
      message: "What do you want to do?",
      choices: Object.keys(choices),
    });

    const selection = result["selection"] as string;
    await choices[selection]();
  }
}

const restClient = new RestClient();
const request = restClient.request.bind(restClient);
const Fetch = restClient.Fetch.bind(restClient);

export { restClient, request, Fetch };
