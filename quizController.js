"use strict";

const Quiz = require("./models/Quiz")
const fetch = require("node-fetch");
const { request, response } = require("express");
let numberOfCorrectAnswers = 0;

module.exports = {
    //クイズデータ表示
    index: async (req, res, next) => {
        let questionId = req.params.id;
        //modelのQuizクラスから１問ずつクイズデータを取得
        let oneData = await Quiz.index(questionId)
        let data = {onedata : oneData}
    
        res.render('quiz.ejs', data)
    },
    answer: (req, res, next) => {
        let Id = req.params.id;
        let correctAnswer = req.body.correctAnswer;
        let yourAnswer = req.body.yourAnswer;

        if (yourAnswer === correctAnswer) {
            numberOfCorrectAnswers += 1
            console.log("正解")
        }
        let data = {numberOfCorrectAnswers : numberOfCorrectAnswers}

        let questionId = parseInt(Id) + 1
        //10問答えたら結果ページへ
        if (questionId > 10) {
            numberOfCorrectAnswers = 0;
            res.render('result.ejs', data)
        }

        res.redirect(`http://localhost:3000/quiz/id=${questionId}`);  
    }
}


