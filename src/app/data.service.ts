import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  secondClick() {
    return this.http.get('https://opentdb.com/api.php?amount=5&amp;category=11&amp;difficulty=medium&amp;type=multiple')

}
}
