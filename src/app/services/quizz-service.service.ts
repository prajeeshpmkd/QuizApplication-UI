import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cards } from '../models/card.model';
import { QuestionDetails } from '../models/questiondetails.model';

interface QuizResult{

  UserId : string ,
  QuizId : number ,
  Score : number ,
  TimeTaken : number
}

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {

  constructor(private http:HttpClient) { }

  getAllCards():Observable<Cards[]>{
    return this.http.get<Cards[]>(`${environment.apiBaseUrl}/api/Quiz`);
  }

  getQuestionDetails(quizid:number):Observable<QuestionDetails[]>{
   return this.http.get<QuestionDetails[]>(`${environment.apiBaseUrl}/api/Quiz/${quizid}`);
  }

  submitQuizResult(result:QuizResult): Observable<any>{
    return this.http.post(`${environment.apiBaseUrl}/api/Quiz/submit`,result);
  }

}
