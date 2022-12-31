import glob from "glob";
import inquirer from "inquirer";
import {
  error,
  header,
  infoSecondary,
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
  const initText = !!exchange.init
    ? `\n${JSON.stringify(exchange.init, null, 2)}\n`
    : "";

  return `
${header("request", { color: true })}

${status} <- ${requestMethod} ${exchange.response.url}
${initText}
${header("body", { color: true })}

${bodyText}
  `;
};

const exchangeToString = (exchange: Exchange) => {
  const response = {
    ...exchange.response,
    body: exchange.body,
  };
  const text = {
    url: exchange.url,
    init: exchange.init,
    response,
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
