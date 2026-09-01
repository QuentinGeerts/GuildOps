import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PlayersService } from '../../core/services/players.service';
import { Player } from '../../shared/models/player.model';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  readonly playersService: PlayersService = inject(PlayersService);
  readonly loading = signal(true);
  readonly player: WritableSignal<Player | null> = signal(null);

  ngOnInit(): void {
    
    this.playersService
      .getMe()
      .subscribe({
        next: (player) => {
          this.player.set(player);
          this.loading.set(false);
        },
        error: (err) => {
          console.log("Erreur: ", err);
        }
      })

  }

}
