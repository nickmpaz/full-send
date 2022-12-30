"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHttpFiles = exports.formatResponse = void 0;
const glob_1 = __importDefault(require("glob"));
const console_1 = require("./console");
const formatResponse = (response, body, raw = false) => {
  const statusLineColor = response.ok ? console_1.success : console_1.error;
  const statusLine = statusLineColor(
    `${response.status} ${response.statusText}`,
    !raw
  );
  return `
${statusLine} <= ${(0, console_1.infoPrimary)(response.url, !raw)}

${(0, console_1.header)("headers", { color: !raw })}

${(0, console_1.prettyObject)(response.headers.raw(), {
  entryLimit: raw ? undefined : 5,
  showRemainingEntries: !raw,
  characterLimit: raw ? undefined : 80,
  showRemainingCharacters: !raw,
  color: !raw,
})}

${(0, console_1.header)("body", { color: !raw })}

${(0, console_1.prettySentence)(body, {
  characterLimit: raw ? undefined : 1000,
  showRemainingCharacters: !raw,
  color: !raw,
})}
`;
};
exports.formatResponse = formatResponse;
const getHttpFiles = () => {
  return new Promise((resolve) => {
    const currentDirectory = process.cwd();
    (0, glob_1.default)(currentDirectory + "/**/*.http.js", {}, (err, files) =>
      __awaiter(void 0, void 0, void 0, function* () {
        resolve(files);
      })
    );
  });
};
exports.getHttpFiles = getHttpFiles;
