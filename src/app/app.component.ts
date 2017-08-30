import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './_redux/reducers';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './_redux/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private store: Store<State>
  ) {

  }

}
