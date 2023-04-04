import React, { useState } from "react";
import he from "he";

export default function Question(props) {
    const styles = {display: props.isGameOn ? "flex" : "none"};
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const correctAnswer = props.data.correctAnswer;
    
    const handleAnswerClick = (e) => {
        setSelectedAnswer(e.target.value);
    };



    return (
    <div className="questions--page" style={styles}>
      <h3>{props.data.question}</h3>
      <div className="buttons--container">
      {props.data.answers.map((answer, index) => (
        <button
          className="btn"
          onClick={handleAnswerClick}
          value={he.decode(answer)}
          key={index}
          style={{
            backgroundColor: selectedAnswer === he.decode(answer) ? "#D6DBF5" : "white",
            color: selectedAnswer === he.decode(answer) ? "white" : "#293264"
          }}>{he.decode(answer)}</button>
      ))}
      </div>
    </div>
  );
}
