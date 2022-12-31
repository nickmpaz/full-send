## About

`Full-send` is an HTTP client framework for node. With `full-send`, you write your HTTP request library as code, and execute your requests using the terminal UI.

## Motiviation

`Full-send` is designed to be a replacement for HTTP platforms/ clients like Postman or Insomnia REST Client. Some of the problems it attempts to address:

- As an engineer, I don't want to have to learn platforms and fiddle with GUI applications, so that I can save time.
- As an engineer, I want an HTTP client that integrates with my development environment/ terminal/ IDE, so that I can reduce context switching in my workflow.
- As an engineer, I want to write my HTTP client library as code, so that I can commit it to version control for my team and myself.
- As an engineer, I want to write my HTTP client library in a programming language that I know, so that I can use that language's features and so that I don't have to learn a domain specific language.
- As an engineer, I want to be able to interact with my HTTP client through a UI, so that once I write my HTTP client library it is easy and convenient to use it.
- As an engineer, I want to build something, so that I can have fun.

## Installation

```
npm install --save-dev @npaz/full-send
```

## Getting Started

After installing `full-send`, you'll need to register your first `action`. You
can think of an `action` as a function that will send your request.

```javascript
// /path/to/your/project/hello.send.js
// IMPORTANT: the file extension must be ".send.js"

import { send, action } from "@npaz/full-send";

action("hello world!", async () => {
  // the send function is a thin wrapper around fetch that lets full-send
  // hook into your request
  await send("https://jsonplaceholder.typicode.com/todos/1");
});
```

Once you've done so, you can run your action using the command-line interface.

```
$ npx full-send
? Make a selection: hello world!

[ REQUEST ]

200 OK <- GET https://jsonplaceholder.typicode.com/todos/1

[ BODY ]

{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}

? Make a selection: (Use arrow keys)
❯ Run this action again
  Inspect raw data in $EDITOR
  Back
```

You can organize your `actions` into groups by registering them inside of a
`collection`. A `collection` can contain any number of `actions` or
`collections` and they can be nested infinitely.

```javascript
import { send, action, collection } from "@npaz/full-send";

collection("my first request", () => {
  action("action 1", async () => {
    await send("https://jsonplaceholder.typicode.com/todos/1");
  });

  action("action 2", async () => {
    await send("https://jsonplaceholder.typicode.com/todos/2");
  });
});
```

## Advanced Usage

### Post Request with Headers

```javascript
import { send, action } from "@npaz/full-send";

action("post request with headers", async () => {
  send("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});
```

### Multiple Sends

```javascript
import { send, action } from "@npaz/full-send";

action("multiple sends", async () => {
  await send("https://jsonplaceholder.typicode.com/todos/1");
  await send("https://jsonplaceholder.typicode.com/todos/2");
});
```

### Persistent State

```javascript
import { send, action } from "@npaz/full-send";

let counter = 1;

action("hello world!", async () => {
  await send(`https://jsonplaceholder.typicode.com/todos/${counter}`);
  counter += 1;
});
```

## API

WIP

## Known Issues

- command-line interface silently exits when recieving very large response bodies

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
