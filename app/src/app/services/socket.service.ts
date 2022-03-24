import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { Store } from '@ngrx/store';
//import { DownloadAction } from 'src/app/store/actions/socket.action';
import { VideoDownloadAction } from 'src/app/store/actions/video.action';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    constructor(
        private socket: Socket,
        private store: Store<{ socketReducer: { downloads: [] } }>) {

        this.socket.on('onDownload', (response: any) => {
            console.log("Download status", response)

            if(response.progress === '100%') {
                console.log("Carga completa")
            }

            this.store.dispatch(VideoDownloadAction({ payload: response}))
        })

    }

    getMusic(videoId: String) {
        const music = this.socket.emit('get_music', videoId, (response: any) => {
            console.log("music callback !", response)
        });
        console.log("music ____", music)
    }

    getSocketId() {
        return this.socket["ioSocket"]["id"]
    }

    /*
    sendMessage(videoId: String) {
        this.socket.emit('download', videoId);
    }
    */


}
