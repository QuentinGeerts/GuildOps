import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Game, GameDetails } from '../../shared/models/game.model';

@Service()
export class GamesService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + "/games";

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.baseUrl);
  }

  getGameDetails(id: string): Observable<GameDetails> {
    return this.http.get<GameDetails>(this.baseUrl + "/" + id);
  }

}
