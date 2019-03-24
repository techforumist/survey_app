import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  public listeners = [];
  constructor(private http: HttpClient, private utils: UtilsService) { }
  getUserRequest(): Observable<any> {
    return this.http.get('/api/get_user')
  }

  getUser(cb) {
    this.getUserRequest().subscribe(res => {
      this.user = res;
      console.log(res)
      if (cb) cb(res);
    }, error => {
      if (cb) cb(error);
    })
  }

  addListeners(cb) {
    this.listeners.push(cb);
  }

  //cred = { username: 'admin', password: 'admin' }
  userLogin(cred): Observable<any> {
    return this.http.post('/api/user_login', cred, { headers: this.utils.getHeaders() })
  }
  logout() {
    this.user = undefined;
    this.http.get('/api/user_logout').subscribe()
    this.callLogoutListeners({});
  }
  login(cred, success, error) {
    this.userLogin(cred).subscribe(res => {
      this.user = res;
      this.callLoginListeners(res);
      if (success) success(res)
    }, er => {
      if (error) error(er)
    })
  }
  private callLoginListeners(user) {
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i].login) {
        this.listeners[i].login(user);
      }
    }
  }

  private callLogoutListeners(data) {
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i].logout) {
        this.listeners[i].logout(data);
      }
    }
  }
}
