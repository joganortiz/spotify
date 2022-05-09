import { EventEmitter, Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callbacks: EventEmitter<any> = new EventEmitter<any>();

  //myObservable1$: Observable<any> = new Observable();
  //myObservable1$: Subject<any> = new Subject();
  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('bien bien')
  
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('pause')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)
  
  constructor() { 
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk => {
      if (responseOk){
        
        this.setAudio(responseOk);
      }
      
    })

    this.listenAllEvents()
  }

  private listenAllEvents(): void {

    this.audio.addEventListener("timeupdate", this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)

  }

  public setAudio(track: TracksModel): void {
    console.log("llega al servicio", track)
    this.audio.src = track.url
    this.audio.play()
  }

  private calculateTime = () => {
    console.log("disparando evento")
    const { duration, currentTime } = this.audio
    //console.table([duration, currentTime])
    this.setTimeElapsed(currentTime);
    this.setRemaining(currentTime, duration)
    // this.setTimeElapsed(currentTime)
    // this.setRemaining(currentTime, duration)
    // this.setPercentage(currentTime, duration)
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`

    this.timeElapsed$.next(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  private setPlayerStatus = (state: any) => {
    console.log(state)
    switch (state.type) { //TODO: --> playing
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('pause')
        break;
    }

  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

}
