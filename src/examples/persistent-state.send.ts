import { send, action } from "@npaz/full-send";

let counter = 1;

action("persistent state", async () => {
	await send(`https://jsonplaceholder.typicode.com/todos/${counter}`);
	counter += 1;
});