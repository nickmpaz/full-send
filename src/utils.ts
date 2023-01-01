import glob from "glob";
import inquirer from "inquirer";
import {
  error,
  header,
  infoSecondary,
  prettyObject,
  prettySentence,
  success,
} from "./console";
import { Exchange } from "./definitions/types";

const getExchangeSummary = (exchange: Exchange) => {
  const statusColor = exchange.response.ok ? success : error;
  const status = statusColor(
    `${exchange.response.status} ${exchange.response.statusText}`,
    true
  );
  const requestMethod = infoSecondary(exchange.init?.method ?? "GET", true);
  const bodyText = prettySentence(exchange.body, {
    characterLimit: 1000,
    showRemainingCharacters: true,
    color: true,
  });

  return `
${header("status", { color: true })}

${status} <- ${requestMethod} ${exchange.response.url}

${header("headers", { color: true })}

${prettyObject(exchange.response.headers.raw(), {
  entryLimit: 5,
  showRemainingEntries: true,
  characterLimit: 80,
  showRemainingCharacters: false,
  color: true,
})}

${header("body", { color: true })}

${bodyText}
  `;
};

const exchangeToString = (exchange: Exchange) => {
  const text = {
    url: exchange.url,
    init: exchange.init,
    response: {
      size: exchange.response.size,
      timeout: exchange.response.timeout,
      status: exchange.response.status,
      statusText: exchange.response.statusText,
      body: exchange.body,
      headers: exchange.response.headers.raw(),
    }
  };
  return JSON.stringify(text, null, 2);
};

const getHttpFiles = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const currentDirectory = process.cwd();
    glob(currentDirectory + "/**/*.send.js", {}, async (err, files) => {
      resolve(files);
    });
  });
};

const openInEditor = (text: string) => {
  return inquirer.prompt({
    type: "editor",
    name: "inspect",
    default: text,
  });
};

export { getHttpFiles, openInEditor, getExchangeSummary, exchangeToString };
