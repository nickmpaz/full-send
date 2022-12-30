interface Request {
    name: string;
    func: () => void | Promise<void>;
}
export { Request };
