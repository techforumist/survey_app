import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: any;
  title = 'survey+';

  ngOnInit(): void {
    //this.userLogin();
  }
  constructor(private http: HttpClient) { }

  getUser() {
    this.http.get('/api/get_user').subscribe(res => {
      this.user = res;
      console.log(res);
    }, error => {

    })
  }
  userLogin() {
    this.http.post('/api/user_login',
      {
        username: 'admin',
        password: 'admin'
      },
      { headers: this.getHeaders() }).subscribe(res => {
        this.user = res;
        console.log(res)
      }, error => {

      })
  }


  private getHeaders() {
    return new HttpHeaders({
      "X-CSRFToken": this.getCookie("csrftoken")
    });
  }
  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

}
