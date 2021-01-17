import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, router: Router, private userService: UserService) {
    //Since this is the App component *root component of our application), 
    //there's no need to unsubscribe from this subscription
    auth.user$.subscribe(
      user => {
        if (!user) return;

        // save/update user's info in firebase's database
        userService.save(user);

        //setting the return url and storing it in browser's local storage to redirect to it after login.
        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    );
  }
}
