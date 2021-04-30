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

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    BorrowableComponent,
    HomeComponent,
    MemberCreateFormComponent,
    MemberSearchComponent,
    MemberUpdateFormComponent,
    BorrowableSearchComponent
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
