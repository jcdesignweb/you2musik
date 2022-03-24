import { Component, OnInit } from '@angular/core';
import { VideoAction } from 'src/app/store/actions/video.action';
import { Store } from '@ngrx/store';
import { VideosService } from '../../services/videos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    error: boolean = false
    searchFilter: String

    constructor(private videoService: VideosService, private readonly store: Store<any>, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe(params => {
            this.searchFilter = params['s'];

            this.search()
        })


    }

    private search() {
        console.log("Searching..")
        this.videoService.getVideos(this.searchFilter).subscribe(videos => {
            console.log("Videos seeee ", videos)
            
            videos.items.map(item => { return Object.assign(item, { isDownloading: false, downloadingProgress: 0 }) })
            this.store.dispatch(VideoAction({ videos: videos.items }))
            

        }, error => {
            this.error = true
        })
    }

}
