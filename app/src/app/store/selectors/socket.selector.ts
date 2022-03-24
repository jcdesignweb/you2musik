import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';

import { socketReducer } from '../reducers/socket.reducer';

export const downloadingState = createFeatureSelector<any>('socket');

export const getDownloadStatusSelector = createSelector(
    downloadingState,
    socketReducer
);