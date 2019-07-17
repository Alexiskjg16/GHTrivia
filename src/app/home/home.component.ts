import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface ResultsObject {
  catergory: string
  correct_answer: string
  difficulty: string
  incorrect_answers: Array<string>
  question: string
  type: string
}

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

results : Array<ResultsObject>;

constructor(private data: DataService) { }

ngOnInit() {
  this.data.getTrivia().subscribe((data: Array<ResultsObject>) => {
    this.results = data
    console.log(this.results)
  })
}
someMethod = () => {
  this.results = this.results.map(results => {
    let temp = results
    temp.incorrect_answers.push(temp.correct_answer)
    return temp
  })
 }
}
