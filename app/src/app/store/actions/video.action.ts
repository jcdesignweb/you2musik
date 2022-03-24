import { Action, createAction, props } from "@ngrx/store";
import { Locally } from "../../model/locally";
import { Video } from "../../model/video";

export const VIDEO_CREATE = '[video] create';
export const VIDEO_DOWNLOAD = '[video] download';

export const VideoAction = createAction(
    VIDEO_CREATE,
    props<{ videos: Array<Video> }>()
);

export const VideoLocallyAction = createAction(
    VIDEO_CREATE,
    props<{ videos: Array<Locally> }>()
);

export const VideoDownloadAction = createAction(
    VIDEO_DOWNLOAD,
    props<{ payload: { vid: string, progress: string} }>()
);
