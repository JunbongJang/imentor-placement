import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServerService} from './server.service';
import {UserService} from './user.service';
import {ViewStateService} from './view-state.service';
import {GeneralUtilityService} from './general-utility.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServerInterceptor} from './server.interceptor';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [ServerService, UserService,
    GeneralUtilityService, ViewStateService,
    {provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true}
  ]
})
export class CoreModule { }
