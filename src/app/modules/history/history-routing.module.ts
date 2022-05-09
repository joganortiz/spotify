import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HisotryPageComponent } from './pages/hisotry-page/hisotry-page.component';

const routes: Routes = [
  {
    path: '',
    component: HisotryPageComponent,
    outlet: 'child'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
