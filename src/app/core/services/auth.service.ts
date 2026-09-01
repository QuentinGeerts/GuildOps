import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterPlayerRequest } from '../../shared/models/auth.model';

@Service()
export class AuthService {

  private readonly baseUrl = environment.apiUrl + "/auth";

  private readonly http = inject(HttpClient);

  register(request: RegisterPlayerRequest): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/players`, request);
  }

}
