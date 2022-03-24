import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { VideosResponse, Video } from '../../model/video';
import { Store } from '@ngrx/store';
import { VideoAction } from 'src/app/store/actions/video.action';
import { Observable } from 'rxjs';
import * as videosSelector from 'src/app/store/selectors/video.selector';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    videos$: Observable<any> | undefined
    error: boolean = false

    videos: Array<Video> = [];

    constructor(private videoService: VideosService, private readonly store: Store<any>) { }

    ngOnInit(): void {
        this.videoService.getVideos("").subscribe(videos => {

            videos.items.map(item => { return Object.assign(item, { isDownloading: false, downloadingProgress: 0 }) })
            this.store.dispatch(VideoAction({ videos: videos.items }))

        }, error => {
            this.error = true
        })



    }

}
