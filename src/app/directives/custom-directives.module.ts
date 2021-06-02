import {NgModule} from '@angular/core';
import {UpperInputDirective} from './upper-input.directive';

@NgModule({
  declarations: [
    UpperInputDirective
  ],
  exports: [
    UpperInputDirective
  ]
})
export class CustomDirectivesModule {
}
