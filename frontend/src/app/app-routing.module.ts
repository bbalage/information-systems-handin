import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowableComponent } from './borrowable/borrowable.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
  {
    path: 'member',
    component: MemberComponent
  },
  {
    path: 'borrowable',
    component: BorrowableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
