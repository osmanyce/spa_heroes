import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Heroe} from '../../models/heroe';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {HeroeDialogComponent} from '../shared/heroe-dialog/heroe-dialog.component';
import {SweetalertUtil} from '../../utils/sweetalert.utils';
import {CONSTANTS} from '../../utils/constants';
import {HeroesService} from '../../services/heroes.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

  constructor(
    private dialog: MatDialog,
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
      console.log(response);
      this.heroes = response;
      this.dataSource = new MatTableDataSource<Heroe>(this.heroes);
      this.dataSource.paginator = this.paginator;
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

  createHeroe(): void {
    this.openDialog().pipe(
      finalize(() => this.listHeroes())
    ).subscribe(
      data => {
        if (data) {
          const id = (new Date()).getTime();
          this.heroesService.createHeroe({...data, id}).subscribe();
        }
      }
    );
  }

  editHeroe(heroe: Heroe): void {
    console.log(heroe);
    this.heroesService.getHeroeById(heroe.id).pipe(
      finalize(() => this.callEditService(heroe))
    ).subscribe(response => heroe = response);
  }

  private callEditService(heroe: Heroe): void {
    this.openDialog(heroe).pipe(
      finalize(() => this.listHeroes())
    ).subscribe(
      data => {
        if (data) {
          const id = heroe.id;
          this.heroesService.updateHeroe({...data, id}).subscribe();
        }
      }
    );
  }

  private openDialog(heroe: Heroe = null): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // set in edit heroe case
    if (heroe) {
      dialogConfig.data = {
        ...heroe
      };
    }
    const dialogRef = this.dialog.open(HeroeDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

}
