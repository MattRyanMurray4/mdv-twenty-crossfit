import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from '@crossfit/api-interfaces';
import { BoxFacade } from '@crossfit/core-state';

@Component({
  selector: 'crossfit-box-info',
  templateUrl: './box-info.component.html',
  styleUrls: ['./box-info.component.scss'],
})
export class BoxInfoComponent {
  @Input() box: Box | null;
  constructor(
    private boxFacade: BoxFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goBack() {
    this.router.navigate(['/box']);
  }
}
