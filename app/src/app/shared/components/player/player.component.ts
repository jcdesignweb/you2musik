import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { PlayerService } from '../../../services/player.service';


enum ButtonStatus {
    Playing = 1,
    Paused = 0,
    Stopped = -1
}

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    buttonStatus: ButtonStatus = ButtonStatus.Stopped

    ic_playpause: String = "play_arrow"

    currentTime: number = 0

    formattedTime: any = '00:00'

    totalSecondMusic: number = 1

    isVolumeActived: boolean = false

    isDragTrackEnabled: boolean = false

    constructor(private readonly store: Store<any>, private playerService: PlayerService) { }

    ngOnInit(): void {
        /*
        this.audio.addEventListener("ended", () => {
            this.onButtonPlayClick()
            this.audio.currentTime = 50;

        });
        */

        this.store.select('player').pipe().subscribe(state => {
            //console.log("player changed", state)

            if (state.video.metadata)
                this.totalSecondMusic = state.video.metadata.duration

            //console.log("totalseconds", this.totalSecondMusic)


            this.formattedTime = new Date(state.currentTime * 1000).toISOString().substr(14, 5);

            if (state.isPlaying) {

                if (!this.isDragTrackEnabled) {
                    this.currentTime = state.currentTime
                }


                this.ic_playpause = "pause"
                this.buttonStatus = ButtonStatus.Paused
            } else if (state.stopped) {
                this.ic_playpause = "play_arrow"
                this.currentTime = 0
                this.formattedTime = "00:00";
            } else {
                this.ic_playpause = "play_arrow"

                this.buttonStatus = ButtonStatus.Playing
            }

        })


        let trackSliderThumbEl: any = document.querySelector('#track-slider .mat-slider-focus-ring');
        console.log(trackSliderThumbEl)

        trackSliderThumbEl.addEventListener('dragstart', (e: any) => {
            console.log("DragStart", e)
        })
        trackSliderThumbEl.addEventListener('drop', (e: any) => console.log("DragStop", e))


    }

    sliderInterval: any
    onTrackInputChange(e: MatSliderChange) {
        this.playerService.pause()
        clearInterval(this.sliderInterval)

        const value: any = e.value
        this.playerService.setSecondTrack(value)

        this.sliderInterval = setTimeout(() => {
            this.playerService.resume()
        }, 300)

        console.log(e)
    }

    onTrackTouch(e: any) {
        console.log("onTrackTouch", e)
    }

    onVolumeInputChange(e: any) {
        //console.log("Cambio !", e.target.value)

        // this.audio.volume = (e.target.value / 100);
        this.playerService.volume(e.target.value)
    }


    onButtonPlayClick() {

        if (this.buttonStatus == ButtonStatus.Paused) {
            this.playerService.pause()

        } else {
            this.playerService.resume()
            //this.playerService.play()
        }

    }

    onVolumeClick() {


        this.isVolumeActived = !this.isVolumeActived
        this.volumePopOver()

    }

    volumePopOver() {
        let volumeEl: any = document.querySelector('.volume');
        let elem: any = document.querySelector('.ic-music');
        let rect = elem.getBoundingClientRect();

        volumeEl.style.left = (rect.x - 110) + "px"
        volumeEl.style.display = (this.isVolumeActived) ? 'block' : 'none'
    }




}
