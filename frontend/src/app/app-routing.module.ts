import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowComponent } from './borrow/borrow.component';
import { MemberDataComponent } from './borrow/borrow-screen/member-data/member-data.component';
import { BorrowableCreateFormComponent } from './borrowable/borrowable-create-form/borrowable-create-form.component';
import { BorrowableUpdateFormComponent } from './borrowable/borrowable-update-form/borrowable-update-form.component';
import { BorrowableComponent } from './borrowable/borrowable.component';
import { HomeComponent } from './home/home.component';
import { MemberCreateFormComponent } from './member/member-create-form/member-create-form.component';
import { MemberUpdateFormComponent } from './member/member-update-form/member-update-form.component';
import { MemberComponent } from './member/member.component';
import { BorrowScreenComponent } from './borrow/borrow-screen/borrow-screen.component';
import { BringBackComponent } from './borrow/bring-back/bring-back.component';
import { LatenessComponent } from './lateness/lateness.component';

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
    path: 'member/update/:id',
    component: MemberUpdateFormComponent
  },
  {
    path: 'borrowable',
    component: BorrowableComponent
  },
  {
    path: 'borrowable/create',
    component: BorrowableCreateFormComponent
  },
  {
    path: 'borrowable/update/:serialNumber',
    component: BorrowableUpdateFormComponent
  },
  {
    path: 'borrow',
    component: BorrowComponent
  },
  {
    path: 'borrow/:id',
    component: BorrowScreenComponent
  },
  {
    path: 'borrow/bring-back/:serialNumber',
    component: BringBackComponent
  },
  {
    path: 'lateness',
    component: LatenessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
