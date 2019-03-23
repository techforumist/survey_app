import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    private http: HttpClient) { }

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
    // headers: { "X-CSRFToken": getCookie("csrftoken")
    console.log(this.getCookie("csrftoken"));
    this.http.post('/api/vote',
      {
        questionId: this.id,
        optionId: this.selectedOptionId
      },
      {
        headers: this.getHeaders()
      }
    ).subscribe(res => { }, eror => { });
  }

}
