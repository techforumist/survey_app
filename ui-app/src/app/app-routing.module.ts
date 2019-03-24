import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './views/questions/questions.component';
import { UserComponent } from './views/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { PostQuestionComponent } from './views/post-question/post-question.component';
import { QuestionComponent } from './views/question/question.component';
import { VoteStatusComponent } from './views/vote-status/vote-status.component';
import { LoginComponent } from './views/login/login.component';
const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'question/:id', component: QuestionComponent },
  { path: 'vote-status/:id', component: VoteStatusComponent },
  { path: 'user', component: UserComponent },
  { path: 'post-question', component: PostQuestionComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
