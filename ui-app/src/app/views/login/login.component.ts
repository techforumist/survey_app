import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //public cred = { username: '', password: '' }
  public errorMessage = '';
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(cred) {
    this.auth.login(cred, user => {
      this.router.navigate([''])
    }, error => {
      this.errorMessage = 'Invalid Credentials'
    });
  }

}
