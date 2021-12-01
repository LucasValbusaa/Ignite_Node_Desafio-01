const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function findUserByUsername(users, username) {
  return users.find((user) => user.username === username);
}

function findTodoById(users, username, id) {
  const user = findUserByUsername(users, username);
  return user.todos.find((todo) => todo.id === id);
}

function findIndexTodoById(users, username, id) {
  const user = findUserByUsername(users, username);
  return user.todos.findIndex((todo) => todo.id === id);
}

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = findUserByUsername(users, username);

  if (!user) return response.status(404).json({ error: "User not found" });

  request.username = username;

  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find((user) => user.username === username);

  if (userAlreadyExists)
    return response.status(400).json({ error: "User already exists" });

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request;

  const user = findUserByUsername(users, username);

  return response.status(200).json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { username } = request;

  const user = findUserByUsername(users, username);

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { username } = request;
  const { id } = request.params;

  const todo = findTodoById(users, username, id);
  if (!todo) return response.status(404).json({ error: "Todo not exists!" });
  todo.title = title;
  todo.deadline = deadline;

  return response.status(200).json(todo);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  const todo = findTodoById(users, username, id);
  if (!todo) return response.status(404).json({ error: "Todo not exists!" });
  todo.done = true;

  return response.status(200).json(todo);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  const indexTodo = findIndexTodoById(users, username, id);
  const user = findUserByUsername(users, username);

  if (indexTodo === -1)
    return response.status(404).json({ error: "Todo not exists!" });

  user.todos.splice(indexTodo, 1);

  return response.sendStatus(204);
});

module.exports = app;
