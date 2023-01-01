import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import inquirer from "inquirer";
import { header } from "./console";
import {
  Collection,
  Exchange,
  isCollection,
  Action,
  SelectionOptions,
} from "./definitions/types";
import {
  exchangeToString,
  getExchangeSummary,
  getHttpFiles,
  openInEditor,
} from "./utils";

class RestClient {
  exchanges: Exchange[] = [];
  currentCollection: Collection = {
    name: "root",
    func: null,
    collections: [],
    actions: [],
    parent: null,
    populated: false,
  };

  action(name: string, func: () => void) {
    this.currentCollection.actions.push({ name, func });
  }

  collection(name: string, func: () => void) {
    this.currentCollection.collections.push({
      name,
      func,
      parent: this.currentCollection,
      collections: [],
      actions: [],
      populated: false,
    });
  }

  async send(
    url: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {
    const response = await fetch(url, init);
    const responseClone = response.clone();
    const body = await response.text();
    this.exchanges.push({ url, init, response, body });
    return responseClone;
  }

  async run(): Promise<void> {
    if (!this.currentCollection.populated) {
      if (this.currentCollection.parent === null) {
        const httpFiles = await getHttpFiles();
        for (const file of httpFiles) {
          await import(file);
        }
      } else {
        if (this.currentCollection.func === null) {
          throw new Error("Something went wrong");
        }
        await this.currentCollection.func();
      }
      this.currentCollection.populated = true;
    }

    const selection = await this.promptSelection();

    if (selection === SelectionOptions.Quit) {
      process.exit(0);
    }

    if (selection === SelectionOptions.Back) {
      if (this.currentCollection.parent === null) {
        throw new Error("Cannot go back, already at root collection");
      }
      this.currentCollection = this.currentCollection.parent;
      return this.run();
    }

    if (!isCollection(selection)) {
      await this.executeAction(selection);
      await this.doNextThing(selection);
      return;
    }

    this.currentCollection = selection;
    await this.run();
  }

  async promptSelection(): Promise<Collection | Action | SelectionOptions> {
    const collectionChoicesHeader = this.currentCollection.collections.length
      ? [new inquirer.Separator(header('collections', { color: true }))]
      : [];
    const collectionChoices = this.currentCollection.collections.map(
      (collection) => ({ name: collection.name, value: collection })
    );
    const actionChoicesHeader = this.currentCollection.actions.length
      ? [new inquirer.Separator(header('actions', { color: true }))]
      : [];
    const actionChoices = this.currentCollection.actions.map((action) => ({
      name: action.name,
      value: action,
    }));

    const title =
      this.currentCollection.parent === null
        ? "Full Send"
        : this.currentCollection.name;
    const { selection }: { selection: Collection | Action | SelectionOptions } =
      await inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Make a selection:",
        loop: false,
        pageSize: 10,
        choices: [
          new inquirer.Separator(header('options', { color: true })),
          this.currentCollection.parent === null
            ? SelectionOptions.Quit
            : SelectionOptions.Back,
          ...collectionChoicesHeader,
          ...collectionChoices,
          ...actionChoicesHeader,
          ...actionChoices,
        ],
      });

    return selection;
  }

  async executeAction(action: Action): Promise<void> {
    this.exchanges = [];
    await action.func();
    const combinedOutputPretty = this.exchanges
      .map((exchange) => getExchangeSummary(exchange))
      .join("\n");
    console.log(combinedOutputPretty);
  }

  async doNextThing(action: Action) {
    const choices: Record<string, () => void | Promise<void>> = {
      "Run this action again": async () => {
        await this.executeAction(action);
        await this.doNextThing(action);
      },
      "Inspect raw data in $EDITOR": async () => {
        const combinedOutputRaw = this.exchanges
          .map((exchange) => exchangeToString(exchange))
          .join("\n");
        await openInEditor(combinedOutputRaw);
        await this.doNextThing(action);
      },
      Back: async () => await this.run(),
    };
    const result = await inquirer.prompt({
      type: "list",
      name: "selection",
      message: "Make a selection:",
      choices: Object.keys(choices),
    });

    const selection = result["selection"] as string;
    await choices[selection]();
  }
}

const restClient = new RestClient();
const action = restClient.action.bind(restClient);
const collection = restClient.collection.bind(restClient);
const send = restClient.send.bind(restClient);

export { restClient, action, collection, send };
