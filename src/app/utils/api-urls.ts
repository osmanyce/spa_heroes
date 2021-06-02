import {environment} from '../../environments/environment';

const API = `${environment.apiUrl}/heroes`;

export const API_URLS = {
  HEROES: API,
  HEROE_BY_ID: `${API}/`
};
