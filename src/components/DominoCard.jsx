function DominoCard({ left, right }) {
  return (
    <div className="domino-card">
      <div className="domino-top">
        {left}
      </div>

      <div className="domino-divider"></div>

      <div className="domino-bottom">
        {right}
      </div>
    </div>
  )
}

export default DominoCard