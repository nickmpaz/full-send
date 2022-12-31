import { RequestInfo, RequestInit, Response } from "node-fetch";

interface Collection {
  parent: Collection | null;
  name: string;
  func: (() => void | Promise<void>) | null;
  collections: Collection[];
  actions: Action[];
  populated: boolean;
}

interface Exchange {
  url: RequestInfo;
  init?: RequestInit | undefined;
  response: Response;
  body: string;
}

enum SelectionOptions {
  Quit = "Quit",
  Back = "Back",
}

const isCollection = (
  maybeCollection: Collection | Action
): maybeCollection is Collection => {
  return maybeCollection.hasOwnProperty("parent");
};
interface Action {
  name: string;
  func: () => void | Promise<void>;
}

export { Action, Collection, isCollection, Exchange, SelectionOptions };
