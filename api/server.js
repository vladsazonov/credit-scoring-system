const bodyParser = require("body-parser");
const crypto = require("crypto");
const express = require("express");

const app = require("express")();
const http = require("http").Server(app);

const users = [
  { email: "1@1.ru", password: "123", id: "1" },
  { email: "admin@oz.ru", password: "qwerty123", id: "2" },
];
const authUsers = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/is/dist/is/"));

// app.get('/api/questions', (req, res) => {
//   res.json(questions);
// });

app.post("/api/login", (req, res) => {
  const user = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );

  if (user) {
    const isUserAuthed = authUsers.some(
      (authUser) => user.email === authUser.email
    );

    if (!isUserAuthed) {
      authUsers.push(user);
      res.json(user);
    } else {
      res.status(422).send("user already authorized");
    }
  } else {
    res.status(422).send("wrong email or password");
  }
});

app.post("/api/register", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    id: crypto.randomBytes(16).toString("hex"),
  };

  const isUserExists = users.some((user) => user.email === newUser.email);

  if (!isUserExists) {
    users.push(newUser);
    res.json("user added");
  } else {
    res.status(422).send("user already exists");
  }
});

app.post("/api/checkSession", (req, res) => {
  const isUserAuthed = authUsers.some((user) => user.id === req.body.userId);

  res.json(JSON.parse(isUserAuthed));
});

app.post("/api/logout", (req, res) => {
  const authUserIndex = authUsers.findIndex(
    (user) => user.id === req.body.userId
  );

  if (authUserIndex !== -1) {
    authUsers.splice(authUserIndex, 1);
  }

  res.json("ok");
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/is/index.html"));
});

http.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on the port`);
});
