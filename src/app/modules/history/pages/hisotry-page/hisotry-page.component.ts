import { Component, OnInit } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-hisotry-page',
  templateUrl: './hisotry-page.component.html',
  styleUrls: ['./hisotry-page.component.css']
})
export class HisotryPageComponent implements OnInit {

  listResults$: Observable<any> = of([])
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    //TODO: agarras el termino y sabes que solo se ejecuta cunado tiene 3 caracters
    console.log('🎁 Estoy en el padre jua jua...', event);
    this.listResults$ = this.searchService.searchTracks$(event)

  }

}
