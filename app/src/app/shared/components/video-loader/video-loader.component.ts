import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'video-loader',
    templateUrl: './video-loader.component.html',
    styleUrls: ['./video-loader.component.scss']
})
export class VideoLoaderComponent implements OnInit {
    @Input() progressNumber: number = 0;

    constructor() { }

    ngOnInit(): void {


    }

}
