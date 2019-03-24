import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  id: any;
  public question: any;
  public selectedOptionId: any;

  constructor(private route: ActivatedRoute,
    private http: HttpClient, private utils: UtilsService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")
      console.log(this.id);
      this.http.get('/api/question/' + this.id).subscribe(data => {
        this.question = data;
      }, error => {

      });
    })
  }
  selectOption(id) {
    this.selectedOptionId = id;
  }
  submitVote() {
    this.http.post('/api/vote',
      {
        questionId: this.id,
        optionId: this.selectedOptionId
      },
      {
        headers: this.utils.getHeaders()
      }
    ).subscribe(res => { }, eror => { });
  }

}
