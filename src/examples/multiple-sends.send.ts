import { send, action } from "@npaz/full-send";

action("multiple sends", async () => {
	await send("https://jsonplaceholder.typicode.com/todos/1");
	await send("https://jsonplaceholder.typicode.com/todos/2");
});