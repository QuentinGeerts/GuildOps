import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { GamesService } from '../../../core/services/games.service';
import { Game } from '../../../shared/models/game.model';

@Component({
  imports: [RouterLink],
  selector: 'app-games-list',
  styleUrl: './games-list.css',
  templateUrl: './games-list.html',
})
export class GamesList implements OnInit {
  private readonly gamesService: GamesService = inject(GamesService);

  readonly games = signal<Game[]>([]);
  readonly error = signal<string | null>(null);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe({
      next: (games: Game[]) => {
        this.games.set(games);
      },
      error: (error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
