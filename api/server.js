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

const clients = [
  {
    id: 1,
    name: "Иванов В.В.",
    info: {
      // Revenues/expenses and property
      salary: 60000,
      spouseSalary: 30000,
      otherRevenues: 15000,
      totalPropertyCost: 2400000,
      totalCarCost: 450000,
      mandatoryPayments: 6300,

      // Employment
      totalWorkExperience: 10,
      numberOfPositions: 2,
      occupation: 21,
      position: "Директор качества",
      jobType: 2,
      workExperience: 11,

      // Personal information
      name: "Иванов Владимир Владимирович",
      dateOfBirth: "1991-01-01",
      sex: "мужской",
      familyStatus: 1,
      childrenCount: 1,
      citizenship: "РФ",
      city: "Ростов-на-Дону",
      education: 6,
      lengthOfStay: 15,

      // Credit info
      loanRepayments: 4,
      activeLoans: 1,
    },
  },
];

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/is/dist/is/"));

// app.get('/api/questions', (req, res) => {
//   res.json(questions);
// });

app.get("/api/clients", (req, res) => {
  res.json(clients);
});

app.post("/api/clients", (req, res) => {
  const foundedClientIndex = clients.findIndex(
    (client) => client.id === req.body.id
  );

  if (foundedClientIndex !== -1) {
    clients[foundedClientIndex] = req.body.data;
  } else {
    const newClient = {
      id: crypto.randomBytes(16).toString("hex"),
      name: req.body.name,
      info: req.body.info,
    };

    clients.push(newClient);
  }

  res.json(clients);
});

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
