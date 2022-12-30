"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoSecondary = exports.infoPrimary = exports.error = exports.success = exports.header = exports.prettyStringify = exports.prettyObject = exports.prettySentence = void 0;
const chalk_1 = __importDefault(require("chalk"));
const success = (text, color) => color ? chalk_1.default.green(text) : text;
exports.success = success;
const error = (text, color) => color ? chalk_1.default.red(text) : text;
exports.error = error;
const infoPrimary = (text, color) => color ? chalk_1.default.blueBright(text) : text;
exports.infoPrimary = infoPrimary;
const infoSecondary = (text, color) => color ? chalk_1.default.cyan(text) : text;
exports.infoSecondary = infoSecondary;
const truncationIndicator = "...";
const prettySentence = (text, options = {}) => {
    const { characterLimit = undefined, showRemainingCharacters = false, color = false, } = options;
    if (!characterLimit || text.length <= characterLimit) {
        return text;
    }
    const visibleCharacters = characterLimit - truncationIndicator.length;
    let sentence = `${text.slice(0, visibleCharacters)}${infoSecondary(truncationIndicator, color)}`;
    if (showRemainingCharacters) {
        const remainingCharacters = text.length - visibleCharacters;
        sentence += infoSecondary(` ${remainingCharacters} more characters`, color);
    }
    return sentence;
};
exports.prettySentence = prettySentence;
const prettyObject = (obj, options) => {
    const { entryLimit = undefined, showRemainingEntries = false, characterLimit = undefined, showRemainingCharacters = false, color = false, } = options;
    let entries = Object.entries(obj);
    let text = "";
    if (entryLimit && entries.length > entryLimit) {
        const entryLength = entries.length;
        entries = entries.slice(0, entryLimit);
        if (showRemainingEntries) {
            text = `\n${infoSecondary(truncationIndicator, color)}\n${infoSecondary(`${entryLength - entryLimit} more`, color)}`;
        }
    }
    text =
        entries
            .map(([key, val]) => prettySentence(`${infoSecondary(key, color)}: ${val}`, {
            characterLimit,
            showRemainingCharacters,
            color,
        }))
            .join("\n") + text;
    return text;
};
exports.prettyObject = prettyObject;
const prettyStringify = (text) => {
    try {
        return JSON.stringify(JSON.parse(text), null, 2);
    }
    catch (err) {
        return text;
    }
};
exports.prettyStringify = prettyStringify;
const header = (text, options = {}) => {
    const { color = false } = options;
    return infoPrimary(text.toUpperCase(), color);
};
exports.header = header;
