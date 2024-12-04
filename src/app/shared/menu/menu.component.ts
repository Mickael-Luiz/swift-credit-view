import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  rotaAtiva = ''
  menuAberto = false

  constructor(private router: Router) {
    setTimeout(() => {
      this.selecionarLink()
    }, 100)
  }

  setRota(rota: string) {
    this.router.navigate([rota])
    setTimeout(() => {
      this.selecionarLink()
    }, 100)
  }

  selecionarLink() {
    this.rotaAtiva = this.router.url.split('/')[1].replace('/', '')
  }

  expandirMenu() {
    this.menuAberto = true
  }

  retrairMenu() {
    this.menuAberto = false
  }

}
