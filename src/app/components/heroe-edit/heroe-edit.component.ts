import {Component, OnInit} from '@angular/core';
import {Heroe} from '../../models/heroe';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroesService} from '../../services/heroes.service';
import {APP_ROUTES} from '../../utils/app-routes';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.component.html',
  styleUrls: ['./heroe-edit.component.scss']
})
export class HeroeEditComponent implements OnInit {

  heroe: Heroe;
  heroeId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.heroeId = +params.id;
    });
    this.getHeroe(this.heroeId);
  }

  getHeroe(id: number): void {
    this.heroesService.getHeroeById(id).subscribe(response => {
      this.heroe = response;
    });
  }

  updateHeroe(heroe: Heroe) {
    if (heroe) {
      this.heroesService.updateHeroe(heroe).subscribe(() => this.router.navigateByUrl(APP_ROUTES.LIST_HEROES));
    }
  }
}
