import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },

  {
    path: "games",
    loadChildren: () => import("./features/games/games.routes")
      .then(x => x.routes)
  }
];
