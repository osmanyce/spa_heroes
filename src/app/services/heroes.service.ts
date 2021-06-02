import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Heroe} from '../models/heroe';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../utils/api-urls';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {
  }

  /**
   * Consult all the superheroes that contain, in their name or power, the value of a parameter sent in the request.
   *
   * @param parameter: string
   */
  listHeroes(parameter: string = null): Observable<Heroe[]> {
    if (!parameter || '' === parameter.trim()) {
      return this.http.get<Heroe[]>(API_URLS.HEROES);
    }
    parameter = parameter.trim().toLowerCase();
    return this.http.get<Heroe[]>(API_URLS.HEROES).pipe(
      map(heroes => heroes.filter(
        item => item.name.toLowerCase().indexOf(parameter) > -1 || item.power.toLowerCase().indexOf(parameter) > -1)
      )
    );
  }

  getHeroeById(heroeId: number): Observable<any> {
    return this.http.get<Heroe[]>(`${API_URLS.HEROE_BY_ID}${heroeId}`);
  }

  createHeroe(heroe: Heroe): Observable<any> {
    return this.http.post<Heroe>(API_URLS.HEROES, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<any> {
    return this.http.put<Heroe>(`${API_URLS.HEROE_BY_ID}${heroe.id}`, heroe);
  }

  deleteHeroe(heroeId: number): Observable<any> {
    return this.http.delete<Heroe>(`${API_URLS.HEROE_BY_ID}${heroeId}`);
  }

}
