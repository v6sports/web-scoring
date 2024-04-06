import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEachBall {
    batting_type?: number | string;
    batting_Style?: number | string;
    bowling_type?: number | string;
    bowling_postion?: number | string;
    bowling_side?: number | string;
    bowling_style?: number | string;
    fielding_Style?: number | string;
    bowling_length?: number | string;
}


const initialState: IEachBall = {} as IEachBall;

export const updateEachBallSlice = createSlice({
    name: "eachBall",
    initialState,
    reducers: {
        updateBattingType: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                batting_type: action.payload,
            };
        },
        updateBattingStyle: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                batting_Style: action.payload,
            };
        },
        updateBowlingType: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                bowling_type: action.payload,
            };
        },
        updateBowlingPosition: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                bowling_postion: action.payload,
            };
        },
        updateBowlingSide: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                bowling_side: action.payload,
            };
        },
        updateBowlingLength: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                bowling_length: action.payload,
            };

        },
        updateBowlingStyle: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                bowling_style: action.payload,
            };
        },
        updateFieldingStyle: (state, action: PayloadAction<number | string>) => {
            return {
                ...state,
                fielding_Style: action.payload,
            };
        },
        resetEachBall: (state) => {
            return initialState;
        }
    },
});

export const {
    updateBattingStyle,
    updateBattingType,
    updateBowlingPosition,
    updateBowlingSide,
    updateBowlingStyle,
    updateBowlingType,
    updateBowlingLength,
    updateFieldingStyle, resetEachBall } = updateEachBallSlice.actions;

export default updateEachBallSlice.reducer;