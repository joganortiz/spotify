import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api

  constructor(private httpClient: HttpClient) { 
   
  }

  /**
   * 
   * @returns Devuelve todas las canciones
   */

  private skipById(listTracks: TracksModel[], id: number): Promise<TracksModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }


  getAllTracks$(): Observable<any> {
    return this.httpClient.get(this.URL+'/tracks')
    .pipe(
      map((dataRaw: any) =>{
        return dataRaw.data
      })
    )
  }

  getAllRndom$(): Observable<any> {
    return this.httpClient.get(this.URL + '/tracks')
      .pipe(
        mergeMap(({data}: any) => this.skipById(data, 0 )),
        catchError((error) => {
          const {status, statusText} = error
          console.log("paso algo en la peticion", [status, statusText])
          return of([])
        })

        // map((dataRevertida) => { //TODO aplicar un filter comun de array
        //   return dataRevertida.filter((track: TrackModel) => track._id !== 1)
        // })
      )
  }
}
