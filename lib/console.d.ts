declare const success: (text: string, color: boolean) => string;
declare const error: (text: string, color: boolean) => string;
declare const infoPrimary: (text: string, color: boolean) => string;
declare const infoSecondary: (text: string, color: boolean) => string;
declare const prettySentence: (text: string, options?: {
    characterLimit?: number;
    showRemainingCharacters?: boolean;
    color?: boolean;
}) => string;
declare const prettyObject: (obj: Record<string, unknown>, options: {
    entryLimit?: number;
    showRemainingEntries?: boolean;
    characterLimit?: number;
    showRemainingCharacters?: boolean;
    color?: boolean;
}) => string;
declare const prettyStringify: (text: string) => string;
declare const header: (text: string, options?: {
    color?: boolean;
}) => string;
export { prettySentence, prettyObject, prettyStringify, header, success, error, infoPrimary, infoSecondary, };
