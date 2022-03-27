import { useState, useEffect, useCallback } from 'react';

const Controls = ({
  left,
  right,
  selectAnswer,
  revealing
}) => {
  const [leftClass, setLeftClass] = useState('control');
  const [rightClass, setRightClass] = useState('control right');

  const chooseLeft = useCallback(() => {
    if (!revealing) {
      setLeftClass('control selected');
      selectAnswer(left);
    }
  }, [left, selectAnswer, revealing])

  const chooseRight = useCallback(() => {
    if (!revealing) {
      setRightClass('control right selected');
      selectAnswer(right);
    }
  }, [right, selectAnswer, revealing])

  // set up event listeners
  useEffect(() => {
    const listener = (e) => {
      if (e.keyCode === 37) {
        chooseLeft();
      } else if (e.keyCode === 39) {
        chooseRight();
      }
    }

    window.addEventListener('keyup', listener);

    return () => {
      window.removeEventListener('keyup', listener);
    }
  }, [chooseLeft, chooseRight]);

  return (
    <div className="controls-container">
      <div className={leftClass} onClick={chooseLeft}>{left}</div>
      <div className={rightClass} onClick={chooseRight}>{right}</div>
    </div>
  )
}

export default Controls;
