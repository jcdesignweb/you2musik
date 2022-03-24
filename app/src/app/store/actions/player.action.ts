import { Action, createAction, props } from "@ngrx/store";

export const PLAYER_PLAY = '[player] play';
export const PLAYER_PAUSE = '[player] pause';
export const PLAYER_STOP = '[player] stop';
export const PLAYER_TIMING = '[player] timing';

export const PlayAction = createAction(
    PLAYER_PLAY,
    props<{ vid: string, isPlaying: boolean, metadata:any} >()
);

export const PauseAction = createAction(
    PLAYER_PAUSE    
);

export const StopAction = createAction(
    PLAYER_STOP,
    props<{stopped: boolean} >()
);

export const TimingAction = createAction(
    PLAYER_TIMING,
    props<{ currentTime: number} >()
);
