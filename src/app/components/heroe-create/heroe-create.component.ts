import {Component, OnInit} from '@angular/core';
import {Heroe} from '../../models/heroe';
import {APP_ROUTES} from '../../utils/app-routes';
import {HeroesService} from '../../services/heroes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroe-create',
  templateUrl: './heroe-create.component.html',
  styleUrls: ['./heroe-create.component.scss']
})
export class HeroeCreateComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  createHeroe(heroe: Heroe) {
    if (heroe) {
      this.heroesService.createHeroe(heroe).subscribe(() => this.router.navigateByUrl(APP_ROUTES.LIST_HEROES));
    }
  }
}
