import { useState } from "react";

const MOVES = ["Rock", "Paper", "Scissors"];

function getComputerMove() {
  return MOVES[Math.floor(Math.random() * 3)];
}

function getResult(userMove, compMove) {
  if (userMove === compMove) return "draw";
  if (
    (userMove === "Rock"     && compMove === "Scissors") ||
    (userMove === "Scissors" && compMove === "Paper")    ||
    (userMove === "Paper"    && compMove === "Rock")
  ) {
    return "win";
  }
  return "lose";
}

export default function App() {
  let [userMove,    setUserMove]    = useState(null);
  let [compMove,    setCompMove]    = useState(null);
  let [playerScore, setPlayerScore] = useState(0);
  let [compScore,   setCompScore]   = useState(0);
  let [result,      setResult]      = useState(null);


  let handleClick = (move) => () => {
    let _compMove = getComputerMove();
    let outcome   = getResult(move, _compMove);

    setUserMove(move);
    setCompMove(_compMove);
    setResult(outcome);


    if (outcome === "win")  setPlayerScore(prev => prev + 1);
    if (outcome === "lose") setCompScore(prev => prev + 1);
  };

  return (
    <div>
      <h1>Computer : Human</h1>
      <h2>{compScore} : {playerScore}</h2>

      {/* FIX: each button passes its move into handleClick */}
      <button onClick={handleClick("Rock")}>🗿</button>
      <button onClick={handleClick("Paper")}>🧻</button>
      <button onClick={handleClick("Scissors")}>✄</button>

      {userMove && (
        <div>
          <h1>{compMove} : {userMove}</h1>
          <p>
            {result === "win"  && "🎉 You win!"}
            {result === "lose" && "😞 You lose!"}
            {result === "draw" && "🤝 It's a draw!"}
          </p>
        </div>
      )}
    </div>
  );
}