import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizResult } from 'src/app/models/quizresult.model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  paramsSubscription?: Subscription;
    quizResult: QuizResult | null = null;
  
    constructor(private route:ActivatedRoute,private router:Router){}
  
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.quizResult = {
          UserId: params['UserId'].charAt(0).toUpperCase()+params['UserId'].slice(1).toLowerCase(),
          QuizId: Number(params['QuizId']),
          Score: Number(params['Score']),
          TimeTaken: Number(params['TimeTaken'])
        };
      });
      console.log("ResultComponent Loaded!");
    }
    getAppreciateMessage(score:number| undefined):string
    {
      if (score === undefined) 
        return "Not Participated";
  
      if (score > 6) {
        return "CONGRATULATIONS";
      }
      else 
      {
      return "You failed, Please try again";
      }
    }
  
    getPerformanceMessage(score: number | undefined): string {
    if (score === undefined) return "No score available.";
  
    if (score >= 18) {
      return "Outstanding! You're a quiz master! 🎯";
    } else if (score >= 15) {
      return "Great job! You have excellent knowledge. 💡";
    } else if (score >= 10) {
      return "Good effort! Keep practicing to improve. 📚";
    } else {
      return "Don't give up! Try again and learn more. 🔥";
    }
    }
  
  
    redirectToQuizPage() {
      console.log('Button clicked, attempting to navigate...');
  }

}
