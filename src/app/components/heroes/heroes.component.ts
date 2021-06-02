import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Heroe} from '../../models/heroe';
import {SweetalertUtil} from '../../utils/sweetalert.utils';
import {CONSTANTS} from '../../utils/constants';
import {HeroesService} from '../../services/heroes.service';
import {finalize} from 'rxjs/operators';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'power', 'actions'];
  dataSource: MatTableDataSource<Heroe>;
  heroes: Heroe[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private heroesService: HeroesService,
    private sweetalertUtil: SweetalertUtil
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.listHeroes();
  }

  private listHeroes(filter: string = null) {
    this.heroesService.listHeroes(filter).subscribe(response => {
      this.heroes = response;
      this.dataSource = new MatTableDataSource<Heroe>(this.heroes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  searchHeroe(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.listHeroes(value);
  }

  deleteHeroe(heroe: Heroe): void {
    this.sweetalertUtil.deleteAlert(CONSTANTS.DELETE_TITLE).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.deleteHeroe(heroe.id).pipe(
          finalize(() => this.listHeroes())
        ).subscribe();
      }
    });
  }

}
