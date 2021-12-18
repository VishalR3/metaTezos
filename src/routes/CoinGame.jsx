import { useState } from "react";
import Coin from "../components/Coin/Coin";
import CoinChoose from "../components/Coin/CoinChoose";

export default function CoinGame(props) {
  const [selectedValue, setSelectedValue] = useState(-1);
  const [round, setRound] = useState(1);
  return (
    <>
      {selectedValue === -1 ? (
        <CoinChoose
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      ) : (
        <Coin
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          key={round}
          user={props.user}
          setUser={props.setUser}
        />
      )}
    </>
  );
}
