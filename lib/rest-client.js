"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.Fetch = exports.request = exports.restClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const inquirer_1 = __importDefault(require("inquirer"));
const console_1 = require("./console");
const utils_1 = require("./utils");
class RestClient {
  constructor() {
    this.requests = {};
  }
  request(name, func) {
    this.requests[name] = { name, func };
  }
  Fetch(url, init) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield (0, node_fetch_1.default)(url, init);
      const responseClone = response.clone();
      const body = (0, console_1.prettyStringify)(yield response.text());
      const responsePretty = (0, utils_1.formatResponse)(response, body);
      console.log(responsePretty);
      const responseRaw = (0, utils_1.formatResponse)(response, body, true);
      this.result = responseRaw;
      return responseClone;
    });
  }
  run() {
    return __awaiter(this, void 0, void 0, function* () {
      var _a;
      const httpFiles = yield (0, utils_1.getHttpFiles)();
      for (const file of httpFiles) {
        yield ((_a = file),
        Promise.resolve().then(() => __importStar(require(_a))));
      }
      const selectedRequest = yield this.selectRequest();
      yield this.sendRequest(selectedRequest);
      yield this.selectNextAction(selectedRequest);
    });
  }
  selectRequest() {
    return __awaiter(this, void 0, void 0, function* () {
      const selection = yield inquirer_1.default.prompt({
        type: "list",
        name: "request",
        message: "Request",
        choices: Object.values(this.requests).map((request) => request.name),
      });
      const selectedRequest = this.requests[selection["request"]];
      return selectedRequest;
    });
  }
  sendRequest(request) {
    return __awaiter(this, void 0, void 0, function* () {
      yield request.func();
    });
  }
  selectNextAction(request) {
    return __awaiter(this, void 0, void 0, function* () {
      const choices = {
        Resend: () =>
          __awaiter(this, void 0, void 0, function* () {
            yield this.sendRequest(request);
            yield this.selectNextAction(request);
          }),
        "Inspect response in $EDITOR": () =>
          __awaiter(this, void 0, void 0, function* () {
            yield inquirer_1.default.prompt({
              type: "editor",
              name: "inspect",
              default: this.result,
            });
            yield this.selectNextAction(request);
          }),
        Quit: () => {},
      };
      const result = yield inquirer_1.default.prompt({
        type: "list",
        name: "selection",
        message: "What do you want to do?",
        choices: Object.keys(choices),
      });
      const selection = result["selection"];
      yield choices[selection]();
    });
  }
}
const restClient = new RestClient();
exports.restClient = restClient;
const request = restClient.request.bind(restClient);
exports.request = request;
const Fetch = restClient.Fetch.bind(restClient);
exports.Fetch = Fetch;
