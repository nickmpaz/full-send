import glob from "glob";
import { Response } from "node-fetch";
import {
  error,
  header,
  infoPrimary,
  prettyObject,
  prettySentence,
  success,
} from "./console";

const formatResponse = (
  response: Response,
  body: string,
  raw: boolean = false
): string => {
  const statusLineColor = response.ok ? success : error;
  const statusLine = statusLineColor(
    `${response.status} ${response.statusText}`,
    !raw
  );
  return `
${statusLine} <= ${infoPrimary(response.url, !raw)}

${header("headers", { color: !raw })}

${prettyObject(response.headers.raw(), {
  entryLimit: raw ? undefined : 5,
  showRemainingEntries: !raw,
  characterLimit: raw ? undefined : 80,
  showRemainingCharacters: !raw,
  color: !raw,
})}

${header("body", { color: !raw })}

${prettySentence(body, {
  characterLimit: raw ? undefined : 1000,
  showRemainingCharacters: !raw,
  color: !raw,
})}
`;
};

const getHttpFiles = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const currentDirectory = process.cwd();
    glob(currentDirectory + "/**/*.http.js", {}, async (err, files) => {
      resolve(files);
    });
  });
};

export { formatResponse, getHttpFiles };
