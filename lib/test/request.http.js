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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
(0, __1.request)("Google", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, __1.Fetch)("https://google.com");
  })
);
(0, __1.request)("Personal Site", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, __1.Fetch)("https://nickpaz.com", { method: "POST" });
  })
);
(0, __1.request)("Test JSON API", () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, __1.Fetch)("https://jsonplaceholder.typicode.com/todos/1");
  })
);
