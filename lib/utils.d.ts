import { Response } from "node-fetch";
declare const formatResponse: (
  response: Response,
  body: string,
  raw?: boolean
) => string;
declare const getHttpFiles: () => Promise<string[]>;
export { formatResponse, getHttpFiles };
