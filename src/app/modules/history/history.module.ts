import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HisotryPageComponent } from './pages/hisotry-page/hisotry-page.component';


@NgModule({
  declarations: [
    HisotryPageComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
