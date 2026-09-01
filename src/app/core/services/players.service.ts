import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Player } from '../../shared/models/player.model';

@Service()
export class PlayersService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + "/players";

  getMe(): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/me`);
  }

}
