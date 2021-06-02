import {TestBed} from '@angular/core/testing';

import {HeroesService} from './heroes.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Heroe} from '../models/heroe';
import {API_URLS} from '../utils/api-urls';

const LIST_HEROES: Heroe[] = [
  {id: 1, name: 'Ironman', power: 'Intelligence'},
  {id: 2, name: 'Thor', power: 'Super strength'},
  {id: 3, name: 'Hulk', power: 'Super strength'},
];

describe('HeroesService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data on <<listHeroes>> method', (done) => {
    service.listHeroes().subscribe(data => {
      expect(data).toEqual(LIST_HEROES);
      done();
    });
    const testRequest = httpTestingController.expectOne(API_URLS.HEROES);
    testRequest.flush(LIST_HEROES);
  });

  it('should filter out data on <<listHeroes>> method', (done) => {
    const expectedData: Heroe[] = [
      {id: 2, name: 'Thor', power: 'Super strength'},
      {id: 3, name: 'Hulk', power: 'Super strength'},
    ];
    service.listHeroes('strength').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne(API_URLS.HEROES);
    testRequest.flush(LIST_HEROES);
  });

  it('should use DELETE verb to delete data on <<deleteHeroe>>', () => {
    const heroeId = 1;
    service.deleteHeroe(heroeId).subscribe();
    const testRequest = httpTestingController.expectOne(`${API_URLS.HEROE_BY_ID}${heroeId}`);
    expect(testRequest.request.method).toEqual('DELETE');
  });

});
