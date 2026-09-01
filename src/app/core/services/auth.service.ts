import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthToken, LoginRequest, RegisterPlayerRequest } from '../../shared/models/auth.model';

const STORAGE_KEY = 'guildsops.tokens';

@Service()
export class AuthService {
  private readonly baseUrl = environment.apiUrl + '/auth';
  private readonly http = inject(HttpClient);

  private readonly tokens = signal<AuthToken | null>(readFromStorage());
  
  readonly isLoggedIn = computed(() => this.tokens() !== null);
  readonly accessToken = computed(() => this.tokens()?.accessToken ?? null);

  register(request: RegisterPlayerRequest): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/players`, request);
  }

  login(request: LoginRequest): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.baseUrl}/login`, request)
      .pipe(tap((tokens: AuthToken) => {
        this.tokens.set(tokens);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
      }));
  }

  logout(): void {
    this.tokens.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

function readFromStorage(): AuthToken | null {
  // Récupérer l'élément dans le storage
  const raw = sessionStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) as AuthToken : null;
}
