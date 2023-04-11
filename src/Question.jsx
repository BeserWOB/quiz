import React, { useEffect, useState } from "react";
import he from "he";
import { v4 as uuidv4 } from 'uuid';

export default function Question(props) {
  /* console.log(props); */
  return(
    <div className="questions--page">
      <h3 >{he.decode(props.data.question)}</h3>
      <div className="buttons--container">
        {props.data.answers.map((answer, index)=> <button 
            className="btn" 
            key={index}
            onClick={(e)=>props.selectAnswer(e, props.data.id)}
            value={he.decode(answer)}
            >
        {he.decode(answer)}</button>)}
      </div>
    </div>
  )
}