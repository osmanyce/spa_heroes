import {Component, OnInit} from '@angular/core';
import {LoaderService} from './services/loader.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SPA Heroes';
  loading = false;

  constructor(
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoaderService class and display or not the loading.
   */
  listenToLoading(): void {
    this.loaderService.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
