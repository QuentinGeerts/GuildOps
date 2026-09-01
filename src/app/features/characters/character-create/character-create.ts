import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CharactersService } from '../../../core/services/characters.service';
import { GamesService } from '../../../core/services/games.service';
import { Game, GameDetails } from '../../../shared/models/game.model';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-character-create',
  styleUrl: './character-create.css',
  templateUrl: './character-create.html',
})
export class CharacterCreate implements OnInit {
  private readonly gamesService: GamesService = inject(GamesService);
  private readonly characterService: CharactersService = inject(CharactersService);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly router: Router = inject(Router);

  form!: FormGroup;

  readonly games = signal<Game[]>([]);
  readonly selectedGame = signal<GameDetails | null>(null);
  readonly classes = computed(() => this.selectedGame()?.classes ?? []);
  readonly maxLevel = computed(() => this.selectedGame()?.maxLevel ?? 1);

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe({
      next: (games) => this.games.set(games),
    });

    this.form = this.fb.group({
      gameId: ['', [Validators.required]],
      characterClassId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      server: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      level: [1, [Validators.required, Validators.min(1), Validators.max(this.maxLevel())]],
    });

    // Recharger les classes en fonction du jeu sélectionner
    this.form.controls['gameId'].valueChanges.subscribe(
      (gameId) => {
        this.form.controls['characterClassId'].setValue('');
        this.selectedGame.set(null);

        if (gameId) {
          this.gamesService.getGameDetails(gameId).subscribe({
            next: (game) => {
              this.selectedGame.set(game);

              // Obligé de re-paramétrer les validateurs pour prendre le nouveau niveau par rapport au jeu sélectionné
              this.form.controls['level'].setValidators([
                Validators.required,
                Validators.min(1),
                Validators.max(game.maxLevel),
              ]);
              this.form.controls['level'].updateValueAndValidity();
            },
            error: (err) => console.log("Erreur: ", err)
          })
        }
      }
    )
  }

  get gameId() {
    return this.form.controls['gameId'];
  }

  get characterClassId() {
    return this.form.controls['characterClassId'];
  }

  get name() {
    return this.form.controls['name'];
  }

  get server() {
    return this.form.controls['server'];
  }

  get level() {
    return this.form.controls['level'];
  }

  onSubmit() {
    if (this.form.invalid){
      return;
    }

    this.characterService.create(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(["dashboard"]),
      error: (err) => console.log("Erreur: ", err)
    })
  }
}
