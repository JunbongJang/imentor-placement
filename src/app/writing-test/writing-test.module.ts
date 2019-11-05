import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WritingQuestionService} from './writing-question.service';
import {WritingTestComponent} from './writing-test.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    WritingTestComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    WritingQuestionService
  ]
})
export class WritingTestModule { }
