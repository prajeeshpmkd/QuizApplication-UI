import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscribable, Subscription } from 'rxjs';
import { Option, QuestionDetails} from 'src/app/models/questiondetails.model';
import { QuizzServiceService } from 'src/app/services/quizz-service.service';
import { QuizResult } from 'src/app/models/quizresult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{

  Quizid:string | null=null;
  questionDetails$?:Observable<QuestionDetails[]>;
  paramsSubscription?: Subscription;
  currentQuestionIndex :number=0;
  selectedOptions: {[key:number]: Option}={};
  selectedOption: Option | null = null;
  resultCount: number=0;
  attemptedCount: number=0;

  errorMessage:string |null=null;

  timer:number =59;
  totaltimetaken:number =0;
  timerSubscription?:Subscription;


constructor(private route:ActivatedRoute,
  private quizservice:QuizzServiceService,private router:Router
){}



  ngOnInit(): void {
   this.paramsSubscription= this.route.paramMap.subscribe({
      next:(params)=>{
        this.Quizid=params.get('quizId');
        const hasReloaded = localStorage.getItem('hasReloaded');
        localStorage.setItem('hasReloaded', 'false');
        if(this.Quizid){
          if(hasReloaded==='false'){
            localStorage.setItem('hasReloaded', 'true');
            window.location.reload();
          }
          this.questionDetails$=this.quizservice.getQuestionDetails(+this.Quizid);
          this.startTimer();
        }
      }
    })
  }
  // Timer section starts
  startTimer(){
    this.timerSubscription=interval(1000).subscribe(()=>{
      if(this.timer>0){
        this.timer--;
        this.totaltimetaken++;
      }
      else{
        this.goToNextQuestion();
      }
    });
  }

  clearTimer(){
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe();
    }
  }

  resetTimer(){
    this.clearTimer();
    this.timer=59;
    this.startTimer();
  }

   // Timer section ends

  goToNextQuestion():void {
    this.currentQuestionIndex++;
    this.restoreSelectedOption();
    this.resetTimer();
  }

  goToPreviousQuestion():void {
    this.currentQuestionIndex--;
    this.restoreSelectedOption();
  }

  isLastQuestion(questions:QuestionDetails[]):boolean{
    return this.currentQuestionIndex===questions.length-1;
  }

  isFirstQuestion(questions:QuestionDetails[]):boolean{
    return this.currentQuestionIndex===0;
  }

  selectOption(option: Option):void {
    this.selectedOptions[this.currentQuestionIndex]=option;
    this.selectedOption=option;
    this.attemptedCount++;
    if(option.isCorrect){
      this.resultCount++;
    }

    console.log('Attempted Count :' + this.attemptedCount);
    console.log('Result Count : ' +this.resultCount);
    console.log('Total time taken : ' + this.totaltimetaken);

}

restoreSelectedOption(): void {
  // Restore the previously selected option when navigating
  this.selectedOption = this.selectedOptions[this.currentQuestionIndex] || null;
}

goToSubmitQuestion():void{
   if(this.attemptedCount!=20){
  const confirmSubmit=confirm('You have not attempted all questions. Are you sure you want to submit the quiz?');  
  if(!confirmSubmit){
    return ;
  }
}
this.submitQuiz();
}

submitQuiz():void{
  const UserId=localStorage.getItem('userId');

  const quizResult: QuizResult = {
    UserId: UserId ? UserId.split('@')[0] : '', 
    QuizId: this.Quizid ? Number(this.Quizid) : 0,  // Ensure it's a number
    Score: this.resultCount,     
    TimeTaken: this.totaltimetaken  
  };

  this.quizservice.submitQuizResult(quizResult).subscribe({
    next:(response)=>{
      this.router.navigate(['/Result'], { queryParams: quizResult });
    },
    error:()=>{
      this.errorMessage='Invalid email or password';
    }
  })
  console.log('Congratulations '+ localStorage.getItem('userId') +' , Your score is '+ this.resultCount);
  
}

}
