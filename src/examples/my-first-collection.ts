import { send, action, collection } from "@npaz/full-send";

collection("my first collection", () => {
	action("action 1", async () => {
		await send("https://jsonplaceholder.typicode.com/todos/1");
	});

	action("action 2", async () => {
		await send("https://jsonplaceholder.typicode.com/todos/2");
	});
});