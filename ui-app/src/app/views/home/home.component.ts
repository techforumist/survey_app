import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dashBoard;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/dash_bord_view/').subscribe(res => {
      this.dashBoard = res;
      console.log(res);
      
    }, error => {

    })
  }

}
