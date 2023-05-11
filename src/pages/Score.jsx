import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScoreSection from '../styles/score';

function Score({ correctAnswer, incorrectAnswers }) {
  const navigate = useNavigate();

  const playAgainHandle = () => {
    navigate('/');
  };
  return (
    <ScoreSection>
      <h1>Seu Score</h1>
      <h3>
        Acertos:
        {' '}
        {correctAnswer}
      </h3>
      <h3>
        Erradas:
        {incorrectAnswers}
      </h3>
      <button onClick={playAgainHandle} type="button">Jogar Novamente</button>
    </ScoreSection>
  );
}

Score.propTypes = {
  correctAnswer: PropTypes.number.isRequired,
  incorrectAnswers: PropTypes.number.isRequired,
};

export default Score;
