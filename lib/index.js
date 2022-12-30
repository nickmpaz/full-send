"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = exports.request = void 0;
var rest_client_1 = require("./rest-client");
Object.defineProperty(exports, "request", {
  enumerable: true,
  get: function () {
    return rest_client_1.request;
  },
});
Object.defineProperty(exports, "Fetch", {
  enumerable: true,
  get: function () {
    return rest_client_1.Fetch;
  },
});
