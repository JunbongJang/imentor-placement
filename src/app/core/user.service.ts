import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInitialized = new Subject<boolean>();
  section = 'writing';
  iid = '1368';
  test_lv = 'basic';
  user_status = 'teacher';
  user_writing_grade: Array<number> = [];
  question_grade = {
    task_score: 0,
    language_score: 0,
    grammar_score: 0,
    total_score: 0
  };
  constructor() { }

  initializeWritingScore() {
    this.question_grade.task_score = 0;
    this.question_grade.language_score = 0;
    this.question_grade.grammar_score = 0;
    this.question_grade.total_score = 0;
  }

}
