import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

//interfaces help define types (or else you'll get object error)
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

// results : Array<ResultsObject>;
results : Array<QuestionObject>;
count : string;

constructor(private data: DataService) { }

ngOnInit() {
  this.data.getTrivia().subscribe((data: {response_code: number, results: Array<ResultsObject>}) => {

    this.results = this.parseResults(data.results)
   // console.log(this.results)
    
  })
}
//this function adds the correct answer to incorrect and mixes them using splice and map, returing 'possible answers' (that we care about rn)
parseResults(results: Array<ResultsObject>): Array<QuestionObject> {
  return results.map(result => {
    const possibleAnswers = [...result.incorrect_answers]
    possibleAnswers.splice(this.generateRandomIndex(result.incorrect_answers.length - 1), 0, result.correct_answer)
    return {
      category: result.category,
      correct_answer: result.correct_answer,
      difficulty: result.difficulty,
      possible_answers: possibleAnswers,
      question: result.question,
      type: result.type
    }
  })
}
//helper function for the splice
generateRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}


countAnswers() {
  let checked = Array.from(document.querySelectorAll('[type=radio]')).filter(input => input['checked'] === true)
  let correct = checked.filter(input => input.className.includes('correct'))
  // console.log('checked', checked)
  console.log('number of correct', correct.length)
  return document.getElementById("finalResults").innerHTML = `You got ${correct.length} right!` ;
}

resetTrivia() {
  this.data.getTrivia().subscribe((data: {response_code: number, results: Array<ResultsObject>}) => {

    this.results = this.parseResults(data.results)
    document.getElementById("finalResults").innerHTML = '' ;
    window.scrollTo(0, 0);
 })
}

}
