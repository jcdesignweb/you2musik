import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../../../model/video';
import { Store } from '@ngrx/store';

import { VideosService } from '../../../services/videos.service';
import { SocketService } from '../../../services/socket.service';
import { PlayerService } from '../../../services/player.service';

import { downloadingState } from 'src/app/store/selectors/socket.selector';
import { videosState } from 'src/app/store/selectors/video.selector';





@Component({
    selector: 'video-item',
    templateUrl: './video-item.component.html',
    styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
    @Input() title: String = "";
    @Input() videoImageUrl: String = "";
    @Input() videoId: String = "";
    @Input() isDownloading: boolean = false;
    @Input() downloadingProgress: number = 0;
    @Input() duration: String = "aaa";

    constructor(private socketService: SocketService, private playerService: PlayerService, private readonly store: Store<any>) {

    }

    ngOnInit(): void {
        console.log("DURATION", this.duration)
    }

    onItemClick() {
        //  let store = applyMiddleware(socketIoMiddleware)(createStore)(socketReducer);
        //this.store.dispatch(new DownloadAction.DownloadAction({ vid: this.videoId }))
        //this.store.dispatch({ type: DownloadAction.SOCKET_DOWNLOAD, payload: { vid: this.videoId } });
        console.log(this.videoId)


        this.playerService.play(this.videoId)
        
       /* CHECK THIS
        this.socketService.sendMessage(this.videoId)
        this.isDownloading = true
        */
        
        //this.store.dispatch({ type: DownloadAction.SOCKET_DOWNLOAD, payload: 'Hello22222222!' });

                    /*
        this.store.select(videosState).pipe().subscribe(data => {
            console.log('data::::downloading', data, "VideoId=" + this.videoId);


            if (data["downloads"][this.videoId + ""]) {
                const _progressNumber = data["downloads"][this.videoId + ""].progress

                const progressInt = parseInt(_progressNumber.substring(0, _progressNumber.length - 1))
                if (progressInt !== NaN) {
                    this.downloadingProgress = progressInt
                }
            }



        });
                    */
    }

}
