import React, { useState } from "react";
import he from "he";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (e) => {
    setSelectedAnswer(e.target.value);
  };

  return (
    <div id={props.data.id}>
      <h3>{props.data.question}</h3>
      {props.data.answers.map((answer, index) => (
        <button
          onClick={handleAnswerClick}
          value={he.decode(answer)}
          key={index}
          style={{
            backgroundColor:
              selectedAnswer === he.decode(answer) ? "green" : "white",
          }}
        >
          {he.decode(answer)}
        </button>
      ))}
    </div>
  );
}
