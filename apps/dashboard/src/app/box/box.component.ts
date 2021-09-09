import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Box, emptyBox } from '@crossfit/api-interfaces';
import { BoxFacade } from '@crossfit/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'crossfit-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  form: FormGroup;
  boxes$: Observable<Box[]> = this.boxFacade.allBox$;
  selectedBox$: Observable<Box> = this.boxFacade.selectedBox$;

  constructor(
    private boxFacade: BoxFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.boxFacade.loadBoxes();
    this.reset();

    const boxesRouteId = this.route.snapshot.params['id'];
    if (boxesRouteId) {
      this.loadBox(boxesRouteId);
    }
  }

  reset() {
    this.selectBox(emptyBox);
    this.form.reset();
  }

  selectBox(box: Box) {
    this.boxFacade.selectBox(box.id);
    this.form.patchValue(box);
  }

  loadBox(boxId: string) {
    this.boxFacade.selectBox(boxId);
    this.boxFacade.loadBox(boxId);
  }

  viewBox(boxId: string) {
    this.router.navigate(['/box', boxId]);
  }

  createBox(box: Box) {
    this.boxFacade.createBox(box);
    this.reset();
  }

  updateBox(box: Box) {
    this.boxFacade.updateBox(box);
    this.reset();
  }

  saveBox(box: Box) {
    box.id ? this.boxFacade.updateBox(box) : this.boxFacade.createBox(box);
    this.reset();
  }

  deleteBox(box: Box) {
    this.boxFacade.deleteBox(box);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      owner: ['', Validators.required],
      quickFact: ['', Validators.required],
      memberAmount: ['', Validators.required],
    });
  }
}
