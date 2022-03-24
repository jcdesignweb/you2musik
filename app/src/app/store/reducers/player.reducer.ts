import * as PlayerAction from '../actions/player.action';
import { createReducer, on } from '@ngrx/store';
import { act } from '@ngrx/effects';

export interface State {
    isPlaying: boolean,
    currentTime: number,
    stopped: boolean,
    video: {
        id: String,
        metadata: any
    }
}


const initialState: State = {
    isPlaying: false,
    stopped: false,
    currentTime: 0,
    video: {
        id: '',
        metadata: null
    }
};

export const playerReducer = createReducer(
    initialState,
    on(PlayerAction.PlayAction, (state, action) => {
        console.log("Action", action)

        return {
            ...state,
            isPlaying: action.isPlaying,
            video: {
                id: action.vid,
                metadata: action.metadata
            }

        }

    }),
    on(PlayerAction.PauseAction, (state) => {

        return {
            ...state,
            isPlaying: false,
        }
    }),
    on(PlayerAction.StopAction, (state, action) => {

        return {
            ...state,
            isPlaying: false,
            stopped: action.stopped
        }
    }),
    on(PlayerAction.TimingAction, (state, action) => {

        return {
            ...state,
            currentTime: action.currentTime,
        }
    }),
    
)