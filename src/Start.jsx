import React, { useEffect, useState } from "react";

export default function Start(props){


    const { start } = props;
    const [numberOfQuestions, setNumberOfQuestions] = useState(3);
    const [difficulty, setDifficulty] = useState("easy");
    const [category, setCategory] = useState(9);
    const [url, setUrl] = useState(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
    
    useEffect(()=>{setUrl(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)},[numberOfQuestions, difficulty,category])
    
    function handleNumberOfQuestionsChange(event) {
        setNumberOfQuestions(event.target.value);
    }
    function handleDifficultyChange(event) {
        setDifficulty(event.target.value);
    }
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    return(
        <main className="start--page">
            <h1>Quizzical</h1>
            <p>Test your knowlege.</p>
            <button onClick={()=>start(url)}>Start Quiz</button>

            <label htmlFor="questionsNumber">Number of questions:
            <select id="questionsNumber" onChange={handleNumberOfQuestionsChange}>
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
            </select>
            </label>

            <label htmlFor="questionsDifficulty">Questions difficulty:
            <select id="questionsDifficulty" onChange={handleDifficultyChange}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
            </label>

            <label htmlFor="questionsCategory">Category:
            <select id="questionsCategory" onChange={handleCategoryChange}>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
            </select>
            </label>
        </main>
    )
}
