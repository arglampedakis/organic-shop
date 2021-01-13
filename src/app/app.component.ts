import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, router: Router){
    //Since this is the App component *root component of our application), 
    //there's no need to unsubscribe from this subscription
    auth.user$.subscribe(
      user => {
        if(user){
          let returnUrl = localStorage.getItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    );
  }
}
