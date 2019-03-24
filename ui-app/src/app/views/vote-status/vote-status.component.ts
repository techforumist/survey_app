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
        this.data = this.formateData(data);
        console.log(this.data)
      }, error => {
      });
    })
  }

  formateData(data){
    let q_options = data.question.options;
    let total = data.total;
    let status = data.status;

    for(let i=0;i<status.length;i++){
      q_options[i].total = total
      q_options[i].vote = status[i].count
      q_options[i].per = (q_options[i].vote/ q_options[i].total)*100
    }
    return data;
  }

}
