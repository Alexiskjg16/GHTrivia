import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface ResultsObject {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: Array<string>
  question: string
  type: string
}
interface QuestionObject {
  category: string
  correct_answer: string
  difficulty: string
  possible_answers: Array<string>
  question: string
  type: string
}

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

results : Array<QuestionObject>;

constructor(private data: DataService) { }

ngOnInit() {
  this.data.getTrivia().subscribe((data: {response_code: number, results: Array<ResultsObject>}) => {
    console.log(data)
    this.results = this.parseResults(data.results)
  })
}

parseResults(results: Array<ResultsObject>): Array<QuestionObject> {
  return results.map(result => {
    return {
      category: result.category,
      correct_answer: result.correct_answer,
      difficulty: result.difficulty,
      possible_answers: result.incorrect_answers.concat(result.correct_answer),
      question: result.question,
      type: result.type
    }
  })
 }
}
