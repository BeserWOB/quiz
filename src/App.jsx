import React from "react";
import Start from "./Start";
import Question from "./Question"; 
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';
import he from 'he';



export default function App(){

  const[isGameOn, setIsGameOn] = React.useState(false);
  const[questions, setQuestions] = React.useState([{
    question: "",
    answers: [],
    correctAnswer: "",
    id: uuidv4(),
    isSelected: false,
  }]);

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
        isSelected: false,
      }))
      setQuestions(questionsArray)

      } catch (error) {
      console.error(error);
    }
  }
  
  function handleClick(e, id, index){
    const selectedQuestion = document.getElementById(id);
    const correctAnswer = questions[index].correctAnswer;
    const userAnswer = e.target.value;
}

  return(
    <main>
      <Start 
        start={start} 
        isGameOn={isGameOn}
      />

      {questions.map((question, index) => 
        <Question
          key={index} 
          data={question}
          handleClick={(e)=>handleClick(e, question.id, index)}
          />
      )}

      <Footer />
    </main>
  )
}