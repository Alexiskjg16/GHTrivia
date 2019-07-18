import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    appTitle: string = 'Is It Time For Some Trivia?'

  constructor() { }

  ngOnInit() {
  }

}
