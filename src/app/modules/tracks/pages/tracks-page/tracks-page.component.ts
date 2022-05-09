import { Component, OnDestroy, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TracksModel> = []
  tracksRandom:Array<TracksModel> = []

  listaObservers$: Array<Subscription> = []

  constructor(private tracksServices: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
    /* this.tracksServices.getAllTracks$()
    .subscribe((response: TracksModel[]) => {
      this.tracksTrending = response
      console.log("-------->", response);
    })

    this.tracksServices.getAllRndom$()
      .subscribe((response: TracksModel[]) => {
        this.tracksRandom = response
        console.log("-------->", response);
      }) */
  }

  ngOnDestroy(): void {
    /* this.listaObservers$.forEach(u=> u.unsubscribe()) */
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await this.tracksServices.getAllTracks$().toPromise()
    //this.tracksRandom = await this.tracksServices.getAllTracks$().toPromise()
    //console.log(' ------- ' , dataRaw)
    
  }

  loadDataRandom(): void {
    this.tracksServices.getAllRndom$()
      .subscribe((response: TracksModel[]) => {
        this.tracksRandom = response
        console.log("-------->", response);
      }, err =>{
        alert("Error de conexion")
      })
  }
}
