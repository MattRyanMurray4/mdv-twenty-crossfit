import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxFacade } from '@crossfit/core-state';

@Component({
  selector: 'crossfit-box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss'],
})
export class BoxItemComponent implements OnInit {
  currentBox$ = this.boxFacade.selectedBox$;

  constructor(
    private boxFacade: BoxFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const boxId = this.route.snapshot.params.id;
    this.loadBox(boxId);
  }

  loadBox(boxId: string) {
    this.boxFacade.selectBox(boxId);
    this.boxFacade.loadBox(boxId);
  }

  goBack() {
    this.router.navigate(['/box']);
  }
}
