import { Action, createAction, props } from "@ngrx/store";

export const SOCKET_DOWNLOAD = '[socket] download';

export const DownloadAction = createAction(
    SOCKET_DOWNLOAD,
    props<{ payload: { vid: string, progress: string} }>()
);
