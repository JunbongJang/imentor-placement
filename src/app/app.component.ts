import {Component, OnInit} from '@angular/core';
import {UserService} from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const url = new URL(window.location.href);
    console.log(window.location.href);
    this.userService.iid = url.searchParams.get('iid');
    this.userService.test_lv = url.searchParams.get('test_lv');
    this.userService.section = url.searchParams.get('section');
    this.userService.userInitialized.next(true);
    console.log('next!');
  }
}
