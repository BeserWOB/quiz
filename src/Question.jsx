import React, { useEffect, useState } from "react";
import he from "he";
import { v4 as uuidv4 } from 'uuid';

export default function Question(props) {

  return(
    <div className="questions--page">
      <h3 >{props.data.question}</h3>
      <div className="buttons--container">
        {props.data.answers.map((answer, index)=> <button 
            className="btn" 
            key={answer.id}
            id={answer.id}
            onClick={(e)=>props.selectAnswer(e, props.data.id)}
            value={answer.answer}
            >
        {answer.answer}</button>)}
      </div>
    </div>
  )
}