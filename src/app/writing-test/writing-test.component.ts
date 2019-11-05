import { Component, OnInit } from '@angular/core';
import {WritingQuestionService} from './writing-question.service';
import {UserService} from '../core/user.service';
import {ServerService} from '../core/server.service';

@Component({
  selector: 'app-writing-test',
  templateUrl: './writing-test.component.html',
  styleUrls: ['./writing-test.component.scss']
})
export class WritingTestComponent implements OnInit {

  question_num_progress = 5;

  constructor(public writingQuestionService: WritingQuestionService,
              public userService: UserService,
              private serverService: ServerService) {
  }

  ngOnInit() {
    console.log('on init');
    this.writingQuestionService.initializeProblemNums(this.userService.test_lv);
    this.question_num_progress = this.writingQuestionService.part1_problem_num;
    this.serverService.postOxFromServer(this.userService.section, this.userService.iid, this.userService.test_lv)
      .subscribe((ox_json_string) => {
          const parsed_json = JSON.parse(ox_json_string);
          console.log(parsed_json);
          let i = 0;
          for (const element of parsed_json[2]) {
            this.writingQuestionService.my_answers[i] = element['mydab'];
            i++;
          }
          this.writingQuestionService.processMyAnswerString();
        },
        (error) => {
          console.log('get questions error');
          console.log(error);
        });
  }

  tableRowClicked(counter: number) {
    console.log('table row clicked: ' + counter);
    const clicked_row = document.getElementById('table_row_' + counter);
    if (clicked_row.innerHTML ===  `<i class="fas fa-check" style="font-size:1.5rem;"></i>`) {
      clicked_row.innerHTML = `<i class="fas fa-times" style="font-size:1.5rem;"></i>`;
    } else {
      clicked_row.innerHTML = `<i class="fas fa-check" style="font-size:1.5rem;"></i>`;
    }
  }

  gradeTablePart1() {
    let correct_counter = 0;
    for (let i = 0; i < this.writingQuestionService.part1_problem_num; i++) {
      const current_row = document.getElementById('table_row_' + i);
      if (current_row.innerHTML ===  `<i class="fas fa-check" style="font-size:1.5rem;"></i>`) {
        this.userService.user_writing_grade[i] = 1;
        correct_counter++;
      } else {
        this.userService.user_writing_grade[i] = 0;
      }
    }

    console.log(this.userService.user_writing_grade);
    return correct_counter.toString(10);
  }

  gradeTablePart2() {
    this.userService.user_writing_grade[this.writingQuestionService.current_problem_num - 1] = this.userService.question_grade.total_score;
  }

  nextQuestion() {
    if (this.writingQuestionService.current_part_num === 1) {
      const correct_counter = this.gradeTablePart1();
      const mydab = this.mydabMaker();
      this.serverService.postPart1ScoreToServer(this.userService.iid, mydab, correct_counter)
        .subscribe((response_string) => {
            console.log('postPart1 Success');
            console.log(response_string);
            this.writingQuestionService.current_part_num = 2;
            this.question_num_progress++;
            this.writingQuestionService.current_problem_num = this.writingQuestionService.part1_problem_num + 1;
            setTimeout(() => {this.displayAnswerSample(); }, 0);
        },
        (error) => {
          alert('Part1 grade saving did not work');
          console.log('error');
          console.log(error);
        });
    } else if (this.writingQuestionService.current_part_num === 2) {
      // part2
      if (this.checkRadioButtons()) {

        this.gradeTablePart2();
        this.serverService.postPart2ScoreToServer(this.userService.iid,
          'wt' + (this.writingQuestionService.current_problem_num - this.writingQuestionService.part1_problem_num).toString(10),
          this.pointValueMaker())
          .subscribe((response_string) => {
              console.log('postPart2 Success');
              console.log(response_string);

              if (this.writingQuestionService.current_problem_num < 10) {
                this.question_num_progress++;
                this.writingQuestionService.current_problem_num++;
                this.userService.initializeWritingScore();
                setTimeout(() => {
                  this.resetRadioButtons();
                  this.displayAnswerSample();
                }, 0);
              } else {
                // finish!!!
                alert('Submitted! You finished grading i-MENTOR Writing Placement test');
                console.log(this.userService.user_writing_grade);
                window.opener.location.reload();
                window.close();
              }
            },
            (error) => {
              alert('Part2 grade saving did not work');
              console.log('error');
              console.log(error);
            });
      } else {
        alert('Please grade your student first before going to the next problem.');
      }
    }
    window.scroll(0, 0);
  }

  changeCurrentProblem(current_problem_num: number) {
    console.log('changeCurrent' + current_problem_num);
    console.log(this.question_num_progress);
    if (this.question_num_progress >= current_problem_num) {
      this.writingQuestionService.current_problem_num = current_problem_num;
      if (this.writingQuestionService.part1_problem_num >= this.writingQuestionService.current_problem_num) {
        this.writingQuestionService.current_part_num = 1;
      } else {
        this.writingQuestionService.current_part_num = 2;
        this.resetRadioButtons();
        setTimeout(() => {this.displayAnswerSample(); }, 0);
      }
      window.scroll(0, 0);
    }

  }

  resetRadioButtons() {
    const radio_list = document.getElementsByClassName('custom-control-input');
    for (let i = 0; i < radio_list.length; i++) {
      (<HTMLInputElement>radio_list[i]).checked = false;
    }
    if (document.getElementById('total_score_cell')) {
      document.getElementById('total_score_cell').innerText = '0';
    }
  }

  checkRadioButtons() {
    const radio_list = document.getElementsByClassName('custom-control-input');
    let check_counter = 0;
    for (let i = 0; i < radio_list.length; i++) {
      if ((<HTMLInputElement>radio_list[i]).checked) {
        check_counter++;
      }
    }
    if (check_counter === 3) {
      return true;
    } else {
      return false;
    }
  }

  handleRadioClick(radio_button) {
    console.log('handle radio: ' + radio_button.target.name + ' ' + radio_button.target.value);
    if (radio_button.target.name === 'task') {
      this.userService.question_grade.task_score = parseInt(radio_button.target.value, 10);
    } else if (radio_button.target.name === 'language') {
      this.userService.question_grade.language_score = parseInt(radio_button.target.value, 10);
    } else if (radio_button.target.name === 'grammar') {
      this.userService.question_grade.grammar_score = parseInt(radio_button.target.value, 10);
    }
    this.userService.question_grade.total_score =
      this.userService.question_grade.task_score + this.userService.question_grade.language_score + this.userService.question_grade.grammar_score;
    document.getElementById('total_score_cell').innerText = this.userService.question_grade.total_score.toString(10);
  }

  displayAnswerSample() {
    const string =  this.writingQuestionService.answers[this.userService.test_lv]['part2'][this.writingQuestionService.current_problem_num - this.writingQuestionService.part1_problem_num - 1];
    document.getElementById('answer_div_sample').innerHTML = string;
  }

  displayWordBlocks(question: string) {
    console.log();
    const block_elements = [];
    for (const word of question.split(' ')) {
      block_elements.push(`
        <span class="badge badge-default px-3 py-2" style="font-size:1.5rem;"> ${word}</span>
      `);
    }
    return block_elements.join('') + '.';
  }

  numberToOX(input_num: number) {
    if (input_num === 0) {
      return 'x';
    } else {
      return 'o';
    }
  }


  mydabMaker() {
    // seq^ox[@@]seq^ox[@@]seq^ox[@@]seq^ox[@@]seq^ox
    let mydab = '';
    for (let seq = 1; seq <= this.writingQuestionService.part1_problem_num; seq++) {
      if (seq === this.writingQuestionService.part1_problem_num) {
        mydab += seq.toString(10) + '^' + this.numberToOX(this.userService.user_writing_grade[seq - 1]);
      } else {
        mydab += seq.toString(10) + '^' + this.numberToOX(this.userService.user_writing_grade[seq - 1]) + '[@@]';
      }
    }
    return mydab;
  }

  pointValueMaker() {
    // ex) 2/3/3
    const point_value = this.userService.question_grade.task_score + '/' + this.userService.question_grade.language_score + '/' + this.userService.question_grade.grammar_score;
    return point_value;
  }

}
