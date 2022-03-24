import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './shared/components/player/player.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FooterComponent } from './shared/components/footer/footer.component'
import { VideoItemComponent } from './shared/components/video-item/video-item.component';
import { GridViewComponent } from './pages/main/components/grid-view/grid-view.component';




import { reducers } from './store/reducers/index.reducer'

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { VideoLoaderComponent } from './shared/components/video-loader/video-loader.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { LibraryComponent } from './pages/library/library.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ViewService } from './services/view.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        TopMenuComponent,
        FooterComponent,
        VideoItemComponent,
        GridViewComponent,
        VideoLoaderComponent,
        LibraryComponent,
        HomeComponent,
        SearchComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatGridListModule,
        DragDropModule,
        HttpClientModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: "#78C000",
            innerStrokeColor: "#C7E596",
            animationDuration: 300,
        }),
        StoreModule.forRoot(reducers),
        SocketIoModule.forRoot(config),
        StoreDevtoolsModule.instrument({
            name: 'YouTube app',
            maxAge: 25,
            logOnly: false,
        })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
        ViewService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
