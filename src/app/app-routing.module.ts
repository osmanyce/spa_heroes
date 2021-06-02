import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroeCreateComponent} from './components/heroe-create/heroe-create.component';
import {HeroeEditComponent} from './components/heroe-edit/heroe-edit.component';
import {APP_ROUTES} from './utils/app-routes';


const routes: Routes = [
  {path: APP_ROUTES.LIST_HEROES, component: HeroesComponent},
  {path: APP_ROUTES.CREATE_HEROE, component: HeroeCreateComponent},
  {path: `${APP_ROUTES.EDIT_HEROE}/:id`, component: HeroeEditComponent},
  {path: '', redirectTo: APP_ROUTES.LIST_HEROES, pathMatch: 'full'},
  {path: '**', redirectTo: APP_ROUTES.LIST_HEROES, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
