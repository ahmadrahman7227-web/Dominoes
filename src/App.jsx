import { useState } from "react"
import "./App.css"
import DominoCard from "./components/DominoCard"

const defaultDominoes = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
]

function App() {
  const [dominoes, setDominoes] = useState(defaultDominoes)
  const [inputNumber, setInputNumber] = useState("")

  // Count double numbers
  const doubleNumbers = dominoes.filter(
    ([a, b]) => a === b
  ).length

  // Sort ASC
  const handleSortAsc = () => {
  const sorted = [...dominoes].sort(
    (a, b) => {
      const totalA = a[0] + a[1]
      const totalB = b[0] + b[1]

      // compare total
      if (totalA !== totalB) {
        return totalA - totalB
      }

      // if total same
      return a[0] - b[0]
    }
  )

  setDominoes(sorted)
}
  
  // Sort DESC
  const handleSortDesc = () => {
  const sorted = [...dominoes].sort(
    (a, b) => {
      const totalA = a[0] + a[1]
      const totalB = b[0] + b[1]

      // compare total
      if (totalA !== totalB) {
        return totalB - totalA
      }

      // if total same
      return b[0] - a[0]
    }
  )

  setDominoes(sorted)
}

  // Flip cards
  const handleFlip = () => {
    const flipped = dominoes.map(
      ([a, b]) => [b, a]
    )

    setDominoes(flipped)
  }

  // Remove duplicate
  const handleRemoveDuplicate = () => {
  const counts = {}

  // count combinations
  dominoes.forEach((domino) => {
    const sorted = [...domino].sort(
      (a, b) => a - b
    )

    const key = sorted.join("-")

    counts[key] = (counts[key] || 0) + 1
  })

  // keep only unique combinations
  const filtered = dominoes.filter(
    (domino) => {
      const sorted = [...domino].sort(
        (a, b) => a - b
      )

      const key = sorted.join("-")

      return counts[key] === 1
    }
  )

  setDominoes(filtered)
}

  // Remove by total
  const handleRemove = () => {
    if (inputNumber === "") return

    const filtered = dominoes.filter(
      ([a, b]) =>
        a + b !== Number(inputNumber)
    )

    setDominoes(filtered)
  }

  // Reset
  const handleReset = () => {
    setDominoes(defaultDominoes)
    setInputNumber("")
  }

  return (
    <div className="container">
      <h1 className="title">
        Dominoes
      </h1>

      {/* Source */}
      <div className="info-box">
        <h3>Source</h3>

        <p className="source-text">
          {JSON.stringify(dominoes)}
        </p>
      </div>

      {/* Double Numbers */}
      <div className="info-box">
        <h3>Double Numbers</h3>

        <p className="double-number">
          {doubleNumbers}
        </p>
      </div>

      {/* Domino Cards */}
      <div className="cards-container">
        {dominoes.length > 0 ? (
          dominoes.map(
            (domino, index) => (
              <DominoCard
                key={index}
                left={domino[0]}
                right={domino[1]}
              />
            )
          )
        ) : (
          <p className="empty-text">
            No domino data
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button onClick={handleSortAsc}>
          Sort (ASC)
        </button>

        <button onClick={handleSortDesc}>
          Sort (DESC)
        </button>

        <button onClick={handleFlip}>
          Flip
        </button>

        <button
          onClick={
            handleRemoveDuplicate
          }
        >
          Remove Dup
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Remove Section */}
      <div className="remove-section">
        <input
          type="number"
          placeholder="Input Number"
          value={inputNumber}
          onChange={(e) =>
            setInputNumber(
              e.target.value
            )
          }
        />

        <button
          onClick={handleRemove}
          disabled={!inputNumber}
          className={
            !inputNumber
              ? "disabled-btn"
              : ""
          }
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default App