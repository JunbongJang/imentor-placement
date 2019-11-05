import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  // -------------------GLOBAL CONSTANTS----------------------
  WRITING = 'writing';
  SPEAKING = 'speaking';
  PLACEMENT_MAIN = 'placement-main';

  private _view_state = this.WRITING;

  constructor() { }

  get view_state(): string {
    return this._view_state;
  }

  set view_state(value: string) {
    this._view_state = value;
  }
}
