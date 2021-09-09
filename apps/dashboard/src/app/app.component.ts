import { Component } from '@angular/core';

@Component({
  selector: 'crossfit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Crossfit-Application';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'box', icon: 'view_list', title: 'Crossfit Boxes' },
  ];
}
