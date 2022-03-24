import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { Store } from '@ngrx/store';
import { VideoAction, VideoLocallyAction } from 'src/app/store/actions/video.action';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

    error: boolean = false

    constructor(private videoService: VideosService, private readonly store: Store<any>) { }

    ngOnInit(): void {
        this.videoService.getLocally().subscribe(videos => {

            console.log("Videos locally", videos.items)

            videos.items.map(item => { return Object.assign(item, { isDownloading: false, downloadingProgress: 0 }) })
            this.store.dispatch(VideoLocallyAction({ videos: videos.items }))

        }, error => {
            this.error = true
        })

        /*
        this.videos$ = this.store.select(s => {
            console.log("VIDEOS$", s)
             
             return s.videos.videos
         })*/
    }

}
