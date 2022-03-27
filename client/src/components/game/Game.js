import { useState, useEffect } from 'react';

// components
import Quote from './Quote';
import Controls from './Controls';
import Score from './Score';
import Feedback from './Feedback';
import Emoji from './Emoji';

const Game = () => {
  const [loaded, setLoaded] = useState(false);
  const [gameData, setGameData] = useState({});
  const [answer, setAnswer] = useState('');
  const [reload, setReload] = useState(false);
  const [score, setScore] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');

  // load game info from api
  useEffect(() => {
    fetch('http://localhost:8080/quote/random')
      .then(res => res.json())
      .then(result => {
        const r = Math.random();
        const data = {};

        if (r < 0.5) {
          data.left = result.author;
          data.right = result.otherAuthor;
        } else {
          data.left = result.otherAuthor;
          data.right = result.author;
        }

        setGameData({
          ...data,
          quote: result.quote
        });
        setAnswer(result.author);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [reload])

  const selectAnswer = (guess) => {
    setRevealing(true);

    if (guess === answer) {
      setFeedbackContent(<Emoji symbol="✔" label="check" />);
      setScore(score + 1);
    } else {
      setFeedbackContent(<Emoji symbol="❌" label="cross" />);
      setScore(0);
    }

    setTimeout(() => {
      setLoaded(false);
      setReload(!reload);
      setRevealing(false);
    }, 2000);
  }

  return (
    <>
      {loaded ?
        <>
          <div>
            <Score currentScore={score} />
            <Quote quote={gameData.quote} />
            <Controls
              left={gameData.left}
              right={gameData.right}
              selectAnswer={selectAnswer}
              revealing={revealing}
            />
          </div>
          <Feedback revealing={revealing} content={feedbackContent} />
        </>
        :
        <div>Loading...</div>
      }
    </>
  )
}

export default Game;
