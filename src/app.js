const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const cors = require('cors')
const mongoose = require('mongoose')
const loggerOne = require("./middlewares/loggerOne");
const bodyParser = require("body-parser");

dotenv.config();

mongoose.connect('mongodb://localhost:27017/mydb', err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});
const app = express();

const { PORT = 3000, API_URL = "http://127.0.0.1" } = process.env;

const helloWorld = (request, response) => {
  response.status(200);
  response.send("Hello, world!");
};

app.use(loggerOne);
// middleware для получения списка users
app.use(bodyParser.json());
app.use(cors)

app.get("/", helloWorld);

app.get("/", (request, response) => {
  response.status(200);
  response.send("Hello, world!");
});

app.post("/", (request, response) => {
  response.status(200);
  response.send("Hello from POST!");
});

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
