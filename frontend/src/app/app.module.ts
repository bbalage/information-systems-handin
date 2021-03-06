import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { BorrowableComponent } from './borrowable/borrowable.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberCreateFormComponent } from './member/member-create-form/member-create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberSearchComponent } from './member/member-search/member-search.component';
import { MemberUpdateFormComponent } from './member/member-update-form/member-update-form.component';
import { BorrowableSearchComponent } from './borrowable/borrowable-search/borrowable-search.component';
import { BorrowableCreateFormComponent } from './borrowable/borrowable-create-form/borrowable-create-form.component';
import { BorrowableUpdateFormComponent } from './borrowable/borrowable-update-form/borrowable-update-form.component';
import { BorrowComponent } from './borrow/borrow.component';
import { MemberDataComponent } from './borrow/borrow-screen/member-data/member-data.component';
import { BorrowablesListComponent } from './borrow/borrow-screen/borrowables-list/borrowables-list.component';
import { CartComponent } from './borrow/borrow-screen/cart/cart.component';
import { BorrowScreenComponent } from './borrow/borrow-screen/borrow-screen.component';
import { BringBackComponent } from './borrow/bring-back/bring-back.component';
import { LatenessComponent } from './lateness/lateness.component';
import { LatenessDescriptorComponent } from './lateness/lateness-descriptor/lateness-descriptor.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    BorrowableComponent,
    HomeComponent,
    MemberCreateFormComponent,
    MemberSearchComponent,
    MemberUpdateFormComponent,
    BorrowableSearchComponent,
    BorrowableCreateFormComponent,
    BorrowableUpdateFormComponent,
    BorrowComponent,
    MemberDataComponent,
    BorrowablesListComponent,
    CartComponent,
    BorrowScreenComponent,
    BringBackComponent,
    LatenessComponent,
    LatenessDescriptorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
