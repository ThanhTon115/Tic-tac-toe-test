import { useEffect, useState } from "react";
import SquareItem from "./components/SquareItem";
import "./index.css";
const WinCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const InitSquare = Array(9).fill(null);
function App() {
  const [squares, setSquares] = useState<Array<string>>(InitSquare);
  const [isXNext, setIsXNext] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState<string | null>();

  const checkWinner = (squares: Array<string>) => {
    for (let i = 0; i < WinCases.length; i++) {
      const [a, b, c] = WinCases[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return squares.every((e) => e) ? "draw" : null;
  };

  const handleClick = (index: number) => {
    const newSquares: Array<string> = squares.slice();
    if (checkWinner(squares) || squares[index]) {
      // end when having winner || square is selected
      return;
    }
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext); // change turn
  };
  const resetRound = () => {
    setSquares(InitSquare);
    setIsXNext(true);
    setShowModal(false);
  };
  useEffect(() => {
    const status = checkWinner(squares);
    setWinner(() => status);
    if (status && !showModal) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 text-2xl">{`Turn: ${isXNext ? "X" : "O"}`}</div>
      {winner && (
        <p className="text-2xl mb-4">
          {winner === "draw" ? `This game is draw` : `Winner is: ${winner}`}
        </p>
      )}
      <div className="grid grid-cols-3 gap-1">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <SquareItem
              key={index}
              onClick={() => handleClick(index)}
              value={squares[index]}
            />
          ))}
      </div>
      <button
        className="px-4 py-2 bg-gray-200 rounded text-black mt-4"
        onClick={() => {
          void resetRound();
        }}
      >
        New game
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
            <div className="p-4">
              <p className="text-gray-700">
                {winner === "draw"
                  ? `This game is draw`
                  : `Winner is: ${winner}`}
              </p>
            </div>
            <div className="flex justify-end gap-4 p-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded text-black"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded text-black"
                onClick={() => {
                  void resetRound();
                }}
              >
                New game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
