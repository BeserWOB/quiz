import React, { useEffect } from "react";
import Start from "./Start";
import Question from "./Question"; 
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';
import he from 'he';



export default function App(){
  
  const[isGameOn, setIsGameOn] = React.useState(false);
  const[questions, setQuestions] = React.useState([]);
  const[score, setScore] = React.useState(0);
  function start(url){
    setIsGameOn(true);
    getData(url);
  }

  async function getData(url) { 
    try {
      const response = await fetch(url);
      const data = await response.json();
      const resultsArray = data.results;
  
      const questionsArray = resultsArray.map(result=> ({
        question: he.decode(result.question),
        answers: ([...result.incorrect_answers, result.correct_answer]).sort(function(){return 0.5 - Math.random()}), 
        correctAnswer: he.decode(result.correct_answer),
        id: uuidv4(),
        selectedAnswer: "",
        isCorrect: false,
      }))
      setQuestions(questionsArray)
      

      } catch (error) {
      console.error(error);
    }
  }

  function selectAnswer(e, id){

    const selectedButton = e.target;
    const buttons = selectedButton.parentElement.querySelectorAll('button');
    buttons.forEach(button => {
        if (button === selectedButton) {
            button.style.backgroundColor = '#D6DBF5';
        } else {
            button.style.backgroundColor = 'transparent';
        }
    });

    setQuestions(prevQuestion=>{
        const updatedQuestion = prevQuestion.map(question=>{
            if(question.id === id){
                return{
                    ...question,
                    selectedAnswer: e.target.value
                }
            }else{
                return question
            }
        })
        return updatedQuestion
    })
}

function checkAnswers(){
  let count = 0;
  questions.forEach(question => {
    if(question.correctAnswer === question.selectedAnswer){
      count++
    }
  })
  setScore(count)
}
console.log(score);
  return(
    <main>
        {!isGameOn && <Start 
          start={start} 
          isGameOn={isGameOn}
        />}

        {isGameOn && questions.map((question, index)=> <Question
          data={question}
          isGameOn={isGameOn}
          key={index}
          selectAnswer={selectAnswer}
          />)}
        {isGameOn && <button className="check--answers-btn"onClick={checkAnswers}>Check answers</button>}
        <h3>You scored {score}/{questions.length} correct answers</h3>
      <Footer />
    </main>
  )
}