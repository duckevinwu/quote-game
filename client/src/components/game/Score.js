const Score = ({
  currentScore
}) => {
  return (
    <div className="score-header">
      <div className="current-score-container">
        <p className="current-score-label">Score:</p>
        <p className="current-score">{currentScore}</p>
      </div>
    </div>
  )
}

export default Score;
