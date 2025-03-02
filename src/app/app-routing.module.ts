import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from './card/card-details/card-details/card-details.component';
import { CardComponent } from './card/card/card.component';
import { QuizPageComponent } from './core/quiz-page/quiz-page.component';
import { LoginComponent } from './core/Auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { QuizresultComponent } from './core/quizresult/quizresult.component';
import { ResultComponent } from './core/result/result.component';

const routes: Routes = [
  {
    path:'card/quizdetails',
    component:CardDetailsComponent
  },
  {
    path:'quiz',
    component:CardComponent,
    canActivate:[authGuard]
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'Result',
    component:QuizresultComponent
  },
  {
    path:'Result-demo',
    component:ResultComponent
  },
  {
    path:'quiz/:quizId',
    component:QuizPageComponent,
    canActivate:[authGuard]
  },
  {
    path:'**',redirectTo:'/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
