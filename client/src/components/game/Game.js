import { useState, useEffect } from 'react';

const Game = () => {
  const [loaded, setLoaded] = useState(false);

  // load game info from api
  useEffect(() => {
    fetch('http://localhost:8080/quote/random')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <>
      {loaded ?
        <div>Game</div>
        :
        <div>Loading...</div>
      }
    </>
  )
}

export default Game;
