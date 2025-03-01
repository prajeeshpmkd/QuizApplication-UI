import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cards } from 'src/app/models/card.model';
import { QuizzServiceService } from 'src/app/services/quizz-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  cards$?:Observable<Cards[]>;
  selectedCard:any;


  constructor(private QuizzServiceService :QuizzServiceService,
    private router:Router,
  private cdRef:ChangeDetectorRef)
  {
  }
  ngOnInit():void{
    this.cards$=this.QuizzServiceService.getAllCards();

    
  }


  // CardToQuizDetails(card: any){
  //  this.selectedCard=card;
  // }

  CardToQuizDetails(card:any){
    this.selectedCard=card;
  }

  startQuiz() {
    this.router.navigate(['/quiz', this.selectedCard?.quizId]).then(() => {
      this.cdRef.detectChanges(); // Manually trigger change detection
    });
  }
}
