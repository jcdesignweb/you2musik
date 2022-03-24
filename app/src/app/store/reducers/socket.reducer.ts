import { createReducer, on } from '@ngrx/store';
import * as DownloadAction from '../actions/socket.action';


export interface State {
    downloads: any
}


const initialState: State = {
    downloads: {}
};

/*
console.log("STATE", state)
console.log("action.payload", action.payload)
return [...state, action.payload]
*/

export const socketReducer = createReducer(
    initialState,
    on(DownloadAction.DownloadAction, (state, action) => {
        console.log("STATE", state)
        console.log("ACTION", action)

        const _downloads = state.downloads

        _downloads[action.payload.vid] = {
            progress: action.payload.progress
        }

        return {
            ...state,
            downloads: _downloads
        }
        /*
        updatedVideos = state.downloads.map(video => {
            console.log("_VIDEO", video)

            if (video["videoId"] === action.payload.vid) {
                console.log("SI EXISTS")
                return action.payload
            } else { 
                console.log("NO EXISTS") 
                return video 
            }

        })
        console.log("updatedVideos ___", updatedVideos)
        */


        //const id = state.downloads.payload.progress
        /*
        const newDownloads = state.downloads
        newDownloads.push(downloads)
        return {
            ...state,
            newDownloads
        }
        */
    }),

);

/*
export function socketReducer(state: Array<any> | undefined, action: Action) {
   return reducer(state, action);
 }
 */

/*
export function socketReducer(state: State = initialState, action: DownloadAction.) {
    switch (action.type) {
        case DownloadAction.SOCKET_DOWNLOAD:

            const newPay = [...state.downloads, []]
            newPay.push(action.payload)
            return {
                ...state,
                downloads: [...state.downloads, action.payload]
            };
        default: {
            return state;
        }
    }
}
*/

