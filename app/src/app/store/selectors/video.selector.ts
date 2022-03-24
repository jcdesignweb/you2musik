import { createFeatureSelector, createSelector } from '@ngrx/store';
//import { videosReducer } from "../reducers/video.reducer";
import * as videosReducer from "../reducers/video.reducer"

export const videosState = createFeatureSelector<videosReducer.State>('videos');

export const videosSelector = createSelector(
    videosState,
    videosReducer.videosReducer
);