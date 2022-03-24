import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Player from '../store/reducers/player.reducer'
import { Observable } from 'rxjs';
import * as PlayerActions from '../store/actions/player.action'
import { SocketService } from '../services/socket.service';
import { HttpClient } from '@angular/common/http';

interface AudioFile {
    metadata: {
        duration: String
    }
}

@Injectable({
    providedIn: 'root'
})
export class PlayerService implements OnInit {

    private file: AudioFile

    private audio: any

    private intervalTiming: any

    private vid: String

    player$: Observable<any> | undefined

    constructor(
        private http: HttpClient,
        private socketService: SocketService,
        private store: Store<any>) {

    }

    ngOnInit() {
        this.store.select('videos').pipe().subscribe(state => {
            console.log("PLAYER SELECT", state)
        })
        this.player$ = this.store.select(s => {

            

            return s.socketReducer.player
        })

    }

    getServerSound(url: string) : Observable<any> {
        
        return this.http.get<any>(url);
    }

    /**
     * trigger Play or Pause action
     * 
     * @param vid String
     */
    async play(vid: String = '') {
        try {

            this.vid = vid

            const socketId = this.socketService.getSocketId()
            
            const url: string = `http://localhost:3000/v1/music/${vid}?socketId=${socketId}`

            /*
            this.getServerSound(url).subscribe(response => {
                console.log("Response", response)
            })
            */

            console.log("Click item video", vid)


            //const music = await this.socketService.getMusic(vid)

            // reset the Audio
            if (this.audio && !this.audio.paused) {
                this.audio.pause(); // Pause and..
                this.audio.currentTime = 0; // ..reset if there is..
                this.audio = null; // ..and then destroy the reference.
            }

            this.audio = new Audio(url);
            this.file = await this.getAudioData()

            this.audio.play()

            this.audio.addEventListener("ended", (event: any) => {
                /* the audio is now playable; play it if permissions allow */
                this.stopInterval()
                this.store.dispatch({ type: PlayerActions.PLAYER_STOP, stopped: true });

            });

            // dispatch sound play action
            this.store.dispatch({ type: PlayerActions.PLAYER_PLAY, vid, isPlaying: true, metadata: this.file.metadata });

            this.startInterval()

        } catch (error) {
            console.error("Sound error", error)
        }

    }

    resume() {
        
        this.audio.play()

        // dispatch sound play action
        this.store.dispatch({ type: PlayerActions.PLAYER_PLAY, vid: this.vid, isPlaying: true, metadata: this.file.metadata });

        this.startInterval()
    }

    pause() {
        this.audio.pause()

        this.store.dispatch({ type: PlayerActions.PLAYER_PAUSE });

        this.stopInterval()
    }

    volume(value: number) {
        this.audio.volume = (value / 100);
    }

    setSecondTrack(seconds: number = 0) {
        if(seconds) {
            this.audio.currentTime = seconds
        }
    }

    private startInterval() {

        this.intervalTiming = setInterval(() => {
            //console.log("CurrentTime", this.file.audio.currentTime)
            this.store.dispatch({ type: PlayerActions.PLAYER_TIMING, currentTime: this.audio.currentTime });
        }, 500)
    }

    private stopInterval() {
        clearInterval(this.intervalTiming)
    }

    //http://localhost:3000/music/${vid}?socketId=${socketId}
    private getAudioData(): any {
        console.log("getAudioData")
        // this is for locally
        //const sound = new Audio(`./assets/mp3/${vid}.mp3`);


        return new Promise((resolve, reject) => {
            let result: AudioFile = {
                metadata: {
                    duration: ''
                }
            }

            this.audio.onerror = (er: any) => { reject(er) }

            this.audio.onloadedmetadata = (metadata: any) => {
                const { duration } = metadata['path'][0]

                result.metadata.duration = duration

                resolve(result)
            }

        })
    }
}
