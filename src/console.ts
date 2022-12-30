import chalk from "chalk";

const success = (text: string, color: boolean) =>
  color ? chalk.green(text) : text;
const error = (text: string, color: boolean) =>
  color ? chalk.red(text) : text;
const infoPrimary = (text: string, color: boolean) =>
  color ? chalk.blueBright(text) : text;
const infoSecondary = (text: string, color: boolean) =>
  color ? chalk.cyan(text) : text;

const truncationIndicator = "...";

const prettySentence = (
  text: string,
  options: {
    characterLimit?: number;
    showRemainingCharacters?: boolean;
    color?: boolean;
  } = {}
) => {
  const {
    characterLimit = undefined,
    showRemainingCharacters = false,
    color = false,
  } = options;

  if (!characterLimit || text.length <= characterLimit) {
    return text;
  }

  const visibleCharacters = characterLimit - truncationIndicator.length;
  let sentence = `${text.slice(0, visibleCharacters)}${infoSecondary(
    truncationIndicator,
    color
  )}`;
  if (showRemainingCharacters) {
    const remainingCharacters = text.length - visibleCharacters;
    sentence += infoSecondary(` ${remainingCharacters} more characters`, color);
  }
  return sentence;
};

const prettyObject = (
  obj: Record<string, unknown>,
  options: {
    entryLimit?: number;
    showRemainingEntries?: boolean;
    characterLimit?: number;
    showRemainingCharacters?: boolean;
    color?: boolean;
  }
) => {
  const {
    entryLimit = undefined,
    showRemainingEntries = false,
    characterLimit = undefined,
    showRemainingCharacters = false,
    color = false,
  } = options;

  let entries = Object.entries(obj);
  let text = "";
  if (entryLimit && entries.length > entryLimit) {
    const entryLength = entries.length;
    entries = entries.slice(0, entryLimit);
    if (showRemainingEntries) {
      text = `\n${infoSecondary(truncationIndicator, color)}\n${infoSecondary(
        `${entryLength - entryLimit} more`,
        color
      )}`;
    }
  }

  text =
    entries
      .map(([key, val]) =>
        prettySentence(`${infoSecondary(key, color)}: ${val}`, {
          characterLimit,
          showRemainingCharacters,
          color,
        })
      )
      .join("\n") + text;

  return text;
};

const prettyStringify = (text: string) => {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch (err) {
    return text;
  }
};

const header = (text: string, options: { color?: boolean } = {}) => {
  const { color = false } = options;
  return infoPrimary(text.toUpperCase(), color);
};

export {
  prettySentence,
  prettyObject,
  prettyStringify,
  header,
  success,
  error,
  infoPrimary,
  infoSecondary,
};
