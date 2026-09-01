import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GamesService } from '../../../core/services/games.service';
import { GameDetails } from '../../../shared/models/game.model';

@Component({
  imports: [RouterLink],
  selector: 'app-game-detail',
  styleUrl: './game-detail.css',
  templateUrl: './game-detail.html',
})
export class GameDetail implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly gamesService = inject(GamesService);

  // Permet de récupérer directement depuis les params
  // grâce à withComponentInputBinding() dans app.config.ts
  readonly id = input.required<string>();

  readonly game = signal<GameDetails | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    console.log('this.activatedRoute :>> ', this.activatedRoute);
    console.log(this.activatedRoute.snapshot.params['id']);
    console.log('id :>> ', this.id());

    this.gamesService.getGameDetails(this.id()).subscribe({
      next: (game: GameDetails) => {
        this.game.set(game);
      },
      error: (err) => {
        this.error.set(err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
