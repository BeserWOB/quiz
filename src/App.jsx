import React, { useEffect, useState } from "react";
import Start from "./Start";
import Question from "./Question"; 
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';
import he from 'he';
import Confetti from 'react-confetti'
import ClipLoader from "react-spinners/ClipLoader";
import { BarLoader, CircleLoader, DotLoader, SyncLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "50vh auto",
  borderColor: "hotpink",
};



export default function App(){
  
  const[isGameOn, setIsGameOn] = useState(false);
  const[endGame, setEndGame] = useState(false);
  const[questions, setQuestions] = useState([]);
  const[score, setScore] = useState(0);
  const[loading, setLoading] = useState(false);

  function start(url){
    setIsGameOn(true);
    getData(url);
  }

  async function getData(url) { 
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const resultsArray = data.results;
  
      const questionsArray = resultsArray.map(result => {
        const answers = ([...result.incorrect_answers, result.correct_answer]).sort(function(){return 0.5 - Math.random()});
        return {
          question: he.decode(result.question),
          answers: answers.map((answer) => {
            return {
              id: uuidv4(),
              answer: he.decode(answer),
            };
          }),
          correctAnswer: he.decode(result.correct_answer),
          id: uuidv4(),
          selectedAnswerId: "",
          isCorrect: false,
        };
      })
      setQuestions(questionsArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  

  function selectAnswer(e, id){
    const selectedButton = e.target;
    const buttons = selectedButton.parentElement.querySelectorAll('button');

    buttons.forEach(button => {
        if (button === selectedButton) {
            button.style.backgroundColor = '#D6DBF5';
        } else {
            button.style.backgroundColor = 'whitesmoke';
        }
    });
    setQuestions(prevQuestion=>{
        const updatedQuestion = prevQuestion.map(question=>{
            if(question.id === id){
                return{
                    ...question,
                    selectedAnswerId: e.target.id
                }
            }else{
                return question
            }
        })
        return updatedQuestion
    })
}

function checkAnswers(){
  let correctCount = 0;
  questions.forEach(question => {

    const selectedButton = document.querySelector(`button[id="${question.selectedAnswerId}"]`);
    const correctButton = document.querySelector(`button[value="${question.correctAnswer}"]`);

    if(selectedButton){
      if (question.correctAnswer === selectedButton.value) {
          correctCount++;
          selectedButton.style.backgroundColor = '#94D7A2';
        } else {
          selectedButton.style.backgroundColor = '#FFC8C8';
          correctButton.style.backgroundColor = '#94D7A2';
        }} else {
            return
        }
  })
  setScore(correctCount);
  setEndGame(true);  
}

function playAgain(){
  location.reload();
}


  return(
    <main>
        {!isGameOn && <Start 
          start={start} 
          isGameOn={isGameOn}
        />}

<SyncLoader
        color="#4d5b9e"
        cssOverride={override}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

        {isGameOn && questions.map((question, index)=> <Question
          data={question}
          isGameOn={isGameOn}
          key={index}
          selectAnswer={selectAnswer}
          />) }

        {isGameOn && 
        <div className="solution--container">
          <button className="check--answers-btn" onClick={!endGame? checkAnswers : playAgain}>{!endGame? "Check answers" : "Play again"}</button>
          {endGame && <h3>You scored {score}/{questions.length} correct answers.</h3>}
        </div>
        }



      <Footer />
      {endGame && score === questions.length && <Confetti />}
    </main>
  )
}