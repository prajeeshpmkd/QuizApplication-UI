import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {

  
  UserName:string | null=null;
  constructor (private authService: AuthServiceService,private cdr: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.UserName = username;
      this.cdr.detectChanges();
    });
  }
}
