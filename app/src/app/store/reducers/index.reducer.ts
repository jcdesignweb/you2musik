import { ActionReducerMap } from '@ngrx/store';
import { socketReducer } from "./socket.reducer";
import { videosReducer } from './video.reducer';
import { playerReducer } from './player.reducer';

export interface State {
    socket: any,
    videos: any,
    player: any
}

export const reducers: ActionReducerMap<State> = {
    socket: socketReducer,
    videos: videosReducer,
    player: playerReducer

};