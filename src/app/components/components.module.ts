import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroesComponent} from './heroes/heroes.component';
import {MatPaginatorModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {HeroeDialogComponent} from './shared/heroe-dialog/heroe-dialog.component';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroeDialogComponent
  ],
  exports: [
    HeroesComponent
  ],
  entryComponents: [HeroeDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule {
}
