import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly auth: AuthService = inject(AuthService);

  logout() {
    if (confirm("Es-tu sûr de vouloir te déconnecter ? ;)"))
      this.auth.logout();
  }
}
