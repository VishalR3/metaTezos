import { useState } from "react";
import Dice from "../components/Dice/Dice";
import DiceChoose from "../components/Dice/DiceChoose";

export default function DiceGame(props) {
  const [selectedValue, setSelectedValue] = useState(0);
  let key = 1;
  return (
    <>
      {selectedValue === 0 ? (
        <DiceChoose
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      ) : (
        <Dice
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          user={props.user}
          setUser={props.setUser}
          key={key++}
        />
      )}
    </>
  );
}
