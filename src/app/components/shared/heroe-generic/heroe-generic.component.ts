import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CONSTANTS} from '../../../utils/constants';
import {Heroe} from '../../../models/heroe';
import {Location} from '@angular/common';

@Component({
  selector: 'app-heroe-generic',
  templateUrl: './heroe-generic.component.html',
  styleUrls: ['./heroe-generic.component.scss']
})
export class HeroeGenericComponent implements OnInit, OnChanges {

  @Input() data: Heroe;
  @Output() dataToSave: EventEmitter<any>;

  form: FormGroup;
  readonly CONSTANTS = CONSTANTS;

  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {
    this.dataToSave = new EventEmitter();
  }

  ngOnInit() {
    this.createFormFields();
  }

  ngOnChanges() {
    this.createFormFields();
    if (this.data) {
      this.form.controls.name.setValue(this.data.name);
      this.form.controls.power.setValue(this.data.power);
    }
  }

  private createFormFields() {
    this.form = this.fb.group({
      name: [null, Validators.compose([
        Validators.required,
        Validators.minLength(this.CONSTANTS.MIN_TEXT_LENGTH),
        Validators.maxLength(this.CONSTANTS.MAX_TEXT_LENGTH)
      ])],
      power: [null, Validators.compose([
        Validators.required,
        Validators.minLength(this.CONSTANTS.MIN_TEXT_LENGTH),
        Validators.maxLength(this.CONSTANTS.MAX_TEXT_LENGTH)
      ])],
    });
  }

  emmitData() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const id = this.data ? this.data.id : (new Date()).getTime();
    this.dataToSave.emit({
      id,
      name: controls.name.value,
      power: controls.power.value
    });
  }

  back() {
    this.location.back();
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to validators name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
}
