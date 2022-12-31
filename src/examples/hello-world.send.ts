import { send, action } from "@npaz/full-send";

action("hello world", async () => {
	await send("https://jsonplaceholder.typicode.com/todos/1");
});