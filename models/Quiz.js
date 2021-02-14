"use strict";

const url = "https://opentdb.com/api.php?amount=10";
const fetch = require("node-fetch");
let questionArray = [];
let correctAnswerArray = [];
let incorrectAnswerArray = [];
let categories = [];
let difficulties = [];
let shuffleChoices = [];
let choices = [];
let calledApiQuiz;

module.exports = {
    createOneQuiz: async function (questionId) {
        questionId = parseInt(questionId);
        //1問目の前に10問分のテストデータをAPIで取得し保存する。
        if (questionId === 1) {
            calledApiQuiz = await callApi()
        }
        const oneQuestionData = subjectQuizData(calledApiQuiz.results, questionId)//１問だけクイズデータを作る。
        return oneQuestionData
    },
}

//クイズAPI呼び出し
function callApi () {
    return new Promise ((resolve, reject) => {
        fetch(url)
        .then((response) => {
            if(response.ok) {
                resolve(response.json())
            }
        })
        .catch((error) => {
            console.log(error)
            reject(error)
        });
    })
}

//１問だけクイズデータを作る。
function subjectQuizData (quizList, number) {
    
    const questionData = {}
    const quizListNumber = number - 1;

    questionArray.push(quizList[quizListNumber]['question']);
    correctAnswerArray.push(quizList[quizListNumber]['correct_answer']);
    incorrectAnswerArray.push(quizList[quizListNumber]['incorrect_answers']);
    categories.push(quizList[quizListNumber]['category']);
    difficulties.push(quizList[quizListNumber]['difficulty']);

    choices.push(correctAnswerArray[0]);
    incorrectAnswerArray[0].forEach(function (incorrectAnswer) {
        choices.push(incorrectAnswer);
    });
    shuffleChoices = shuffle(choices);

    questionData['questionArray'] = questionArray
    questionData['correctAnswerArray'] = correctAnswerArray
    questionData['incorrectAnswerArray'] = incorrectAnswerArray
    questionData['categories'] = categories
    questionData['difficulties'] = difficulties
    questionData['shuffleChoices'] = shuffleChoices
    questionData['questionNumber'] = number

    questionArray = [];
    correctAnswerArray = [];
    incorrectAnswerArray = [];
    categories = [];
    difficulties = [];
    shuffleChoices = [];
    choices = [];

    return questionData;
}

//選択肢をシャッフルする
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
