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
  const styles = {display: isGameOn ? "block" : "none"};
  
  function start(url){
    setIsGameOn(true);
    getData(url);
  }

  function checkAnswers(){
    
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
          isGameOn={isGameOn}
          />
      )}
      <button className="check--answers-btn" style={styles} onClick={checkAnswers}>Check answers</button>
      <Footer />
    </main>
  )
}