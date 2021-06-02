import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroesComponent} from './heroes/heroes.component';
import {MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroeCreateComponent} from './heroe-create/heroe-create.component';
import {HeroeEditComponent} from './heroe-edit/heroe-edit.component';
import {HeroeGenericComponent} from './shared/heroe-generic/heroe-generic.component';
import {RouterModule} from '@angular/router';
import {CustomDirectivesModule} from '../directives/custom-directives.module';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroeCreateComponent,
    HeroeEditComponent,
    HeroeGenericComponent
  ],
  exports: [
    HeroesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDirectivesModule
  ]
})
export class ComponentsModule {
}
