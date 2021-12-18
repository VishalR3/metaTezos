import { useDispatch, useSelector } from "react-redux";
import { incrementRound } from "../../utils/features/gameSlice";

export default function DiceChoose({ selectedValue, setSelectedValue }) {
  const diceValues = [1, 2, 3, 4, 5, 6];
  const dispatch = useDispatch();
  const rounds = useSelector((state) => state.game.rounds);
  const winCount = useSelector((state) => state.game.winCount);
  const StartRound = (value) => {
    dispatch(incrementRound());
    setSelectedValue(value);
  };
  return (
    <>
      <div className="screenCenter">
        <div className="container">
          <div className="text-center">
            <h1 className="type-h1">Choose Your Value</h1>
            <h3 className="type-h3">Round : {rounds + 1}</h3>
          </div>
          <div className="row justify-content-center mt-5 mb-3">
            {diceValues.map((value) => (
              <div
                className="col-lg-3 col-sm-6 cursor-pointer"
                key={value}
                onClick={() => StartRound(value)}
              >
                <div
                  className={`card diceValueCard place-center mb-3 ${
                    selectedValue === value ? "selectedValue" : ""
                  }`}
                >
                  <div className="card-body">
                    <span className="diceValue">{value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {rounds > 0 ? (
            <div className="footer text-center">
              <h4>You have won {winCount} times</h4>
              <div className="btn btn-success">End Game</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
