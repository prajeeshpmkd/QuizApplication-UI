import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboadComponent } from './core/dashboad/dashboad.component';
import { CardComponent } from './card/card/card.component';

import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthService } from './interceptors/auth.service';

import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { CardDetailsComponent } from './card/card-details/card-details/card-details.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { QuizPageComponent } from './core/quiz-page/quiz-page.component';
import { QuizresultComponent } from './core/quizresult/quizresult.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';

@NgModule({ declarations: [
        AppComponent,
        DashboadComponent,
        CardComponent,
        CardDetailsComponent,
        NavBarComponent,
        QuizPageComponent,
        QuizresultComponent
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,RouterModule,
        AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule], 
        providers: [provideHttpClient(withInterceptors([authInterceptor])),
            { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true } 
        ] })
export class AppModule { }
