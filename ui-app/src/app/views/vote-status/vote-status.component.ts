import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vote-status',
  templateUrl: './vote-status.component.html',
  styleUrls: ['./vote-status.component.css']
})
export class VoteStatusComponent implements OnInit {
  id: any;
  public data;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      console.log(this.id);
      this.http.get('/api/vote-status/?id=' + this.id).subscribe(data => {
        this.data = data;
        console.log(data)
      }, error => {
      });
    })
  }

}
