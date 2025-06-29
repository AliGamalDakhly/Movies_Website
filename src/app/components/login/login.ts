import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

   email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // تحقق بسيط فقط
    if (this.email && this.password) {
      const username = this.email.split('@')[0];
      localStorage.setItem('username', username);
      this.router.navigate(['/']).then(() => {
        window.location.reload(); // علشان الـ navbar يتحدث
      });
    } else {
      alert('Please fill in email and password');
    }
  }
}
