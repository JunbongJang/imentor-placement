import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private httpClient: HttpClient) { }

  // function obtained from https://angular.io/guide/http
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getUserFromServer() {
    return this.httpClient.get<string>('/IMENTOR/get-member.php')
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // this gets 10 my_answers from the server
  postOxFromServer(section: string, iid: string, test_lv: string) {

    const body = {
      'section': section, // writing,
      'iid': iid, // 1368,
      'test_lv': test_lv // basic
    };

    return this.httpClient.post<string>('/mypage/mng/control/ibhui2/getOx-json.php', body, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  postPart1ScoreToServer(iid: string, mydab: string, o_cnt: string) {
    // iid
    // mydab=seq^ox[@@]seq^ox[@@]seq^ox[@@]seq^ox[@@]seq^ox
    // o_cnt = 맞은갯수
    console.log('postPart1ScoreToServer');
    console.log(mydab);
    console.log(o_cnt);
    const body = {
      'iid': iid,
      'mydab': mydab,
      'o_cnt': o_cnt
    };

    return this.httpClient.post<string>('/mypage/mng/control/ibhui2/save_ibhui_teacher_wt_p1_json.php', body, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  postPart2ScoreToServer(iid: string, point_name: string, point_value: string) {
    // iid
    // point_name		: ex) wt1
    // point_value		: ex) 2/3/3
    console.log('postPart2ScoreToServer');
    console.log(point_name);
    console.log(point_value);
    const body = {
      'iid': iid,
      'point_name': point_name,
      'point_value': point_value
    };

    return this.httpClient.post<string>('/mypage/mng/control/ibhui2/save_ibhui_teacher_json.php', body, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }
}
