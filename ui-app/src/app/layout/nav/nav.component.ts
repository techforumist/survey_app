import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public isAuthenticated = false;
  public user;
  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.router.navigate(['login']);
    //this.auth.login({ 'username': 'admin', 'password': 'admin' }, null, null)
  }
  logout() {
    this.auth.logout(data => {
      this.router.navigate(['login'])
    })

  }
  ngOnInit() {
    this.auth.getUser(user => {
      if (user && user.username) {
        this.user = user;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.auth.addListeners({
      login: user => {
        if (user && user.username) {
          this.user = user;
          this.isAuthenticated = true;
        }
      }, logout: val => {
        this.user = null;
        this.isAuthenticated = false;
      }
    })
  }

}
