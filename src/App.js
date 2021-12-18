import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/style.css";
import "./App.css";
import Homepage from "./routes/Homepage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import DiceGame from "./routes/DiceGame";
import Gamify from "./routes/Gamify";
import Recycle from "./routes/Recycle";
import MyCoins from "./routes/MyCoins";
import { useState, useEffect } from "react";
import CoinGame from "./routes/CoinGame";
import GameChoose from "./routes/GameChoose";
import axios from 'axios'

function App() {
  const [AuthenticatedUser, setAuthenticatedUser] = useState({});

  axios.defaults.withCredentials=true;
    const headers = {
        "Content-Type": "application/json"
    }

  useEffect(() => {
    const user = window.localStorage.getItem("userData");
    setAuthenticatedUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("userData", JSON.stringify(AuthenticatedUser));
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dice">
            <DiceGame user={AuthenticatedUser} setUser={setAuthenticatedUser}/>
          </Route>
          <Route path="/coin">
            <CoinGame user={AuthenticatedUser} setUser={setAuthenticatedUser}/>
          </Route>
          <Route path="/chooseGame">
            <GameChoose />
          </Route>
          <Route exact path="/">
            <Homepage
              AuthenticatedUser={AuthenticatedUser}
              setAuthenticatedUser={setAuthenticatedUser}
            />
          </Route>
          <Route path="/login">
            <Login setAuthenticatedUser={setAuthenticatedUser} />
          </Route>
          <Route path="/register">
            <Register setAuthenticatedUser={setAuthenticatedUser} />
          </Route>
          <Route path="/gamify">
            <Gamify />
          </Route>
          <Route path="/myCoins">
            <MyCoins
              AuthenticatedUser={AuthenticatedUser}
              setAuthenticatedUser={setAuthenticatedUser}
            />
          </Route>
          <Route path="/recycle">
            <Recycle
              AuthenticatedUser={AuthenticatedUser}
              setAuthenticatedUser={setAuthenticatedUser}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
