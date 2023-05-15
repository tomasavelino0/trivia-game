/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
import {
  useEffect, useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import GameSection from '../styles/game';
import { fetchQuestionsByCategory } from '../services/api';
import Score from './Score';
import { Main } from '../styles/main';

function Game() {
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [embaralhedAnswer, setEmbaralhedAnswer] = useState([]);
  const [clickedAnswer, setClickedAnswer] = useState('');
  const [answers, setAnswers] = useState({
    correctAnswer: 0,
    incorrectAnswers: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const randomQuestions = () => {
    const random = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[random]);
    questions.splice(random, 1);
    if (currentQuestion === undefined) {
      const { correctAnswer, incorrectAnswers } = answers;
      navigate('/score', { state: { correctAnswer, incorrectAnswers } });
    }
  };

  useEffect(() => {
    const { categoryId } = location.state;
    async function fetchData() {
      const data = await fetchQuestionsByCategory(categoryId, 'easy');
      setQuestions(data.results);
      setCurrentQuestion(data.results[0]);
    }
    fetchData();
  }, []);

  let timerId;
  useEffect(() => {
    if (timer === 0) {
      clearTimeout(timerId);
    } else {
      timerId = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timer, questions]);

  useEffect(() => {
    if (timer === 30 && currentQuestion) {
      const { correct_answer, incorrect_answers } = currentQuestion;
      const randomsAnswers = [...incorrect_answers, correct_answer];
      randomsAnswers.sort(() => Math.random() - 0.5);
      setEmbaralhedAnswer(randomsAnswers);
    }
    if (timer === 0 && clickedAnswer === '') {
      setAnswers((prev) => ({ ...prev, incorrectAnswers: prev.incorrectAnswers + 1 }));
      clearTimeout(timerId);
      randomQuestions();
      setClickedAnswer('');
      setTimer(30);
    }
  }, [timer, currentQuestion]);

  useEffect(() => {
    if (currentQuestion) {
      const { correct_answer } = currentQuestion;
      if (clickedAnswer !== '' && clickedAnswer === correct_answer) {
        setAnswers((prev) => ({ ...prev, correctAnswer: prev.correctAnswer + 1 }));
        clearTimeout(timerId);
        randomQuestions();
        setClickedAnswer('');
        setTimer(30);
      }
      if (clickedAnswer !== '' && clickedAnswer !== correct_answer) {
        setAnswers((prev) => ({ ...prev, incorrectAnswers: prev.incorrectAnswers + 1 }));
        clearTimeout(timerId);
        randomQuestions();
        setClickedAnswer('');
        setTimer(30);
      }
    }
  }, [clickedAnswer, currentQuestion]);

  const lettersQuestions = ['A', 'B', 'C', 'D'];

  return (
    <Main>
      {currentQuestion ? (
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
          </header>
          <section className="questions">
            <h1>{currentQuestion ? currentQuestion.question : 'Carregando'}</h1>
            <div className="answer-container">
              <ul>
                {currentQuestion && embaralhedAnswer ? embaralhedAnswer.map((question, i) => (
                  <li
                    onClick={(e) => setClickedAnswer(e.target.innerText.slice(3))}
                    key={uuidv4()}
                  >
                    {`${lettersQuestions[i]}: ${question}`}
                  </li>
                )) : null}
              </ul>
            </div>
          </section>
          <section className="play-again">
            <h4>
              Tempo restante:
              {' '}
              {timer}
              {' '}
              segundos
            </h4>
          </section>
        </GameSection>
      ) : (
        <Score
          correctAnswer={answers.correctAnswer}
          incorrectAnswers={answers.incorrectAnswers}
        />
      )}

    </Main>
  );
}

export default Game;
