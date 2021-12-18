import { useHistory } from "react-router";

export default function GameChoose() {
  const history = useHistory();
  return (
    <>
      <div className="screenCenter">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-4">
              <div
                className="card gameCard"
                onClick={() => history.push("./dice")}
              >
                <div className="card-body">
                  <h1 className="type-h1">Dice</h1>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div
                className="card gameCard"
                onClick={() => history.push("./coin")}
              >
                <div className="card-body">
                  <h1 className="type-h1">Coin</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
