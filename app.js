const express = require('express')
const ejs = require('ejs')
const app = express()

app.set('ejs', ejs.renderFile)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/quiz/id=:id', (req, res) => {
    let id = req.query.id;
    let data = {
        id : id
        }
    res.render('quiz.ejs', data)
})

app.get('/quiz/result', (req, res) => {
    res.render('result.ejs')
})


app.listen(3000, () => {
    console.log('server start')
}) 