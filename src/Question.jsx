import React from "react";
import he from 'he';

export default function Question(props){ 
     const styles = {backgroundColor: props.data.isSelected? "green" : "white"}

    return(
        <div id={props.data.id}>
            <h3>{props.data.question}</h3>
            {props.data.answers.map((answer, index) => <button 
            style={styles}
                onClick={props.handleClick} 
                value={he.decode(answer)} 
                key={index}
                >{he.decode(answer)}</button>)
            }
        </div>
    )
}

