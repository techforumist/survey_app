import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions: any;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.http.get('/api/question').subscribe((res) => {
      this.questions = res;
    }, (eror) => {

    });
  }
  deleteQueston(q) {
    this.http.delete('/api/question/' + q.id, {
      headers: this.utils.getHeaders()
    }).subscribe((res) => {
      this.getQuestions();
    }, (eror) => {

    });
  }

}
