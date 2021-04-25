import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowableComponent } from './borrowable/borrowable.component';
import { HomeComponent } from './home/home.component';
import { MemberCreateFormComponent } from './member/member-create-form/member-create-form.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'member',
    component: MemberComponent
  },
  {
    path: 'member/create',
    component: MemberCreateFormComponent
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
