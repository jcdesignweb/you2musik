
import { createReducer, on, Action } from '@ngrx/store';
import { Video } from '../../model/video';
import * as VideoAction from '../actions/video.action';

export interface State {
    videos: any
}

const initialState: State = {
    videos: []
};

export const videosReducer = createReducer(
    initialState,
    on(VideoAction.VideoAction, (state, videos) => ({ ...state, ...videos })),
    on(VideoAction.VideoDownloadAction, (state, download) => {
        console.log("Video download reducer", download)
        console.log("Video download reducer VIDEOS", state)
        console.log("Video download reducer VIDEOS2", state.videos)


        if(!state.videos) return { ...state} 

        state.videos.map((video: Video) => {
            console.log("video", video)
            if (video.id.videoId === download.payload.vid) {
                video.isDownloading = true

                const _progressNumber = download.payload.progress

                const progressInt = parseInt(_progressNumber.substring(0, _progressNumber.length - 1))
                if (progressInt !== NaN) {
                    //this.downloadingProgress = progressInt
                    video.downloadingProgress = progressInt
                }
                
            }
        })

        return { videos: state.videos }
    })

);

export function reducer(state: State | undefined, action: Action): any {
    return videosReducer(state, action);
}