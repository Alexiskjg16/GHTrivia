import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  title = 'Alexis Trivia App';
  triviaquestion={}

  public getQuestion(){
    this.http.get("http://opentdb.com/api.php?amount=5&amp;category=11&amp;difficulty=medium&amp;type=multiple")
    .subscribe(function(triviaquestion){this.triviaquestion=triviaquestion}.bind(this))
  }
}
