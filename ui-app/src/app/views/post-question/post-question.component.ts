import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {
  public options = [];
  public question = '';
  public option = '';
  constructor(private http: HttpClient, private utils: UtilsService, private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.http.post('/api/post_question/',
      {
        'question': this.question,
        'options': this.options
      }, {
        headers: this.utils.getHeaders()
      }).subscribe(res => {
        console.log('res',res)
        this.router.navigate(['questions']);
      }, error => {
        console.log('error',error)
      })

  }
  deleteOption(i) {
    this.options.splice(i, 1);
  }
  addOption() {
    this.options.push(this.option);
    this.option = '';
  }
}
