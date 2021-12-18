import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rounds: 0,
  winCount: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementRound: (state) => {
      state.rounds += 1;
      console.log("Incrementing Rounds");
    },
    incrementWinCount: (state) => {
      state.winCount += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementRound, incrementWinCount } = gameSlice.actions;

export default gameSlice.reducer;
