import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CONSTANTS} from '../../../utils/constants';

@Component({
  selector: 'app-heroe-dialog',
  templateUrl: './heroe-dialog.component.html',
  styleUrls: ['./heroe-dialog.component.scss']
})
export class HeroeDialogComponent implements OnInit {

  form: FormGroup;
  title = CONSTANTS.CREATE_TITLE;
  heroe: any = {};
  readonly CONSTANTS = CONSTANTS;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.title = CONSTANTS.EDIT_TITLE;
      this.heroe = data;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.heroe.name, Validators.compose([
        Validators.required,
        Validators.minLength(CONSTANTS.MIN_TEXT_LENGTH),
        Validators.maxLength(CONSTANTS.MAX_TEXT_LENGTH)
      ])],
      power: [this.heroe.power, Validators.compose([
        Validators.required,
        Validators.minLength(CONSTANTS.MIN_TEXT_LENGTH),
        Validators.maxLength(CONSTANTS.MAX_TEXT_LENGTH)
      ])],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
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
