import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
    searchModel: String;

    constructor(private router: Router) { }

    ngOnInit(): void { }

    onKeypressEvent(event: any) {
        if (event.keyCode === 13) {
            this.search()
        }
    }

    onBtnSearchClick() {
        this.search()

    }

    private search() {
        
        if (this.searchModel) {
            this.router.navigate([`/search/${this.searchModel}`])
        }

    }
}
