import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-start-finish',
  templateUrl: './start-finish.component.html',
  styleUrls: ['./start-finish.component.css']
})
export class StartFinishComponent implements OnInit {
  private searchTerms = new Subject<string>();

  constructor() { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
  }

}
