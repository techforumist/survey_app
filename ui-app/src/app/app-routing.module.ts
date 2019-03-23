import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './views/questions/questions.component';
import { UserComponent } from './views/user/user.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
