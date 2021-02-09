const express = require('express')
const ejs = require('ejs');
const quiz = require('./models/Quiz');
const quizController = require('./quizController');
const app = express()
global.fetch = require("node-fetch");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.set('ejs', ejs.renderFile)

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/quiz/id=:id', quizController.index);
app.post('/quiz/id=:id', quizController.answer);

app.listen(3000, () => {
    console.log('server start')
}) 