import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HisotryPageComponent } from './pages/hisotry-page/hisotry-page.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HisotryPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HistoryModule { }
