import {
  useEffect, useState, useRef, useMemo
} from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import GameSection from '../styles/game';
import { fetchQuestionsByCategory } from '../services/api';

function Game() {
  const [timer, setTimer] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [answers, setAnswers] = useState({
    correctAnswer: 0,
    incorrectAnswers: 0,
    notAnswered: 0,
  });
  const timerId = useRef();
  const location = useLocation();

  const randomQuestions = () => {
    const random = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[random]);
    questions.splice(random, 1);
  };

  const startTimer = async () => {
    timerId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (questions.length === 0) {
      const data = await fetchQuestionsByCategory(location.state.categoryId, 'easy');
      setQuestions(data.results);
    }
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
    setTimer(0);
  };

  useEffect(() => {
    const { categoryId } = location.state;
    async function fetchData() {
      const data = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=easy&type=multiple`);
      const response = await data.json();
      setQuestions(response.results);
      setCurrentQuestion(response.results[0]);
      questions.splice(0, 1);
    }
    fetchData();
  }, []);

  useMemo(() => {
    if (timer === 0 && questions.length > 0) {
      randomQuestions();
      setTimer(5);
    }
    if (timer === 0 && questions.length === 0) {
      stopTimer();
    }
  }, [timer, questions]);
  return (
    <GameSection>
      <header className="header-game">
        <h3>
          Corretas:
          {' '}
          {answers.correctAnswer}
        </h3>
        <h3>
          Erradas:
          {' '}
          {answers.incorrectAnswers}
        </h3>
        <h3>
          Nao respondidas:
          {' '}
          {answers.notAnswered}
        </h3>
      </header>
      <button onClick={startTimer} type="button">{questions.length > 0 ? 'Comecar' : 'Jogar Novamente'}</button>
      <h1>{currentQuestion.question}</h1>
      <ul>
        {currentQuestion ? currentQuestion.incorrect_answers.map((question) => (
          <li key={uuidv4()}>{question}</li>
        )) : (<h1>carregando</h1>)}
        {currentQuestion ? <li key={uuidv4()}>{currentQuestion.correct_answer}</li>
          : (<h1>carregando</h1>)}
      </ul>
      <section className="play-again">
        <h5>
          Tempo restante:
          {timer}
        </h5>
      </section>
    </GameSection>
  );
}

export default Game;
