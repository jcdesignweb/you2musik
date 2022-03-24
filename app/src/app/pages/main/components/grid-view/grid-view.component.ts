import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Video } from '../../../../model/video';
import { videosState } from 'src/app/store/selectors/video.selector';
import { Observable } from 'rxjs';
  
@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
    videos$: Observable<any> | undefined

    constructor(private readonly store: Store<any>) { }

    ngOnInit(): void {

        
        this.videos$ = this.store.select(s => {
            console.log("VIDEOS$", s)
            
            return s.videos.videos
        })
        

        
        
        

        
        
    }

}
