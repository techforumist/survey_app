import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { UserComponent } from './views/user/user.component';
import { HomeComponent } from './views/home/home.component';
import { PostQuestionComponent } from './views/post-question/post-question.component';
import { QuestionComponent } from './views/question/question.component';
import { VoteStatusComponent } from './views/vote-status/vote-status.component';
import { NavComponent } from './layout/nav/nav.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    UserComponent,
    HomeComponent,
    PostQuestionComponent,
    QuestionComponent,
    VoteStatusComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
