import { useDispatch, useSelector } from "react-redux";
import { incrementRound } from "../../utils/features/gameSlice";
import {useHistory} from 'react-router-dom';

export default function CoinChoose({ selectedValue, setSelectedValue }) {
  const coinValues = ["Head", "Tail"];
  const dispatch = useDispatch();
  const rounds = useSelector((state) => state.game.rounds);
  const winCount = useSelector((state) => state.game.winCount);
  const StartRound = (value) => {
    console.log(value)
    dispatch(incrementRound());
    setSelectedValue(value);
  };

  const history = useHistory();
  const redirectMyCoins = () => {
    history.push('/myCoins')
  }

  return (
    <>
      <div className="screenCenter">
        <div className="container">
          <div className="text-center">
            <h1 className="type-h1">Choose Your Value</h1>
            <h3 className="type-h3">Round : {rounds + 1}</h3>
          </div>
          <div className="row justify-content-center mt-5 mb-3">
            {coinValues.map((value, index) => (
              <div
                className="col-lg-3 col-sm-6 cursor-pointer"
                key={index}
                onClick={() => StartRound(index)}
              >
                <div
                  className={`card diceValueCard place-center mb-3 ${
                    selectedValue === index ? "selectedValue" : ""
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
              <div className="btn btn-success" onClick={redirectMyCoins}>End Game</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
