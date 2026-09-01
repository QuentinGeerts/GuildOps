import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },

  {
    path: 'games',
    loadChildren: () => import('./features/games/games.routes').then((x) => x.routes),
    title: 'GuildOps | Liste des jeux',
  },

  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((f) => f.Register),
    title: 'GuildOps | Inscription',
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((f) => f.Login),
    title: 'GuildOps | Connexion',
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((f) => f.Dashboard),
    title: 'GuildOps | Dashboard',
    canActivate: [authGuard],
  },

  {
    path: 'characters',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'new',
        loadComponent: () =>
          import('./features/characters/character-create/character-create').then(
            (f) => f.CharacterCreate,
          ),
        title: "GuildOps | Création d'un personnage",
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/characters/character-details/character-details').then(
            (f) => f.CharacterDetails,
          ),
        title: 'GuildOps | Détails personnage',
      },
    ],
  },
];
