import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.http.get('/api/question').subscribe((res) => {
      this.questions = res;
    }, (eror) => {

    });
  }

}
