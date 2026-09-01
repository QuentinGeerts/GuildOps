import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Character, CreateCharacterRequest } from '../../shared/models/character.model';

@Service()
export class CharactersService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = `${environment}/characters`;

  create(request: CreateCharacterRequest): Observable<Character> {
    return this.http.post<Character>(this.baseUrl, request);
  }

}
