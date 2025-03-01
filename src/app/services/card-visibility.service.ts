import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardVisibilityService {

  IsCardVisible=false;
  toggleCardVisibility(){
    this.IsCardVisible=!this.IsCardVisible;
   }
  constructor() { }

  
}
